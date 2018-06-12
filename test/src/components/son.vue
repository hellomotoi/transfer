<template>
  <div class="hello">
    <div class="zuo">
      <ul>
        <li v-for="(province,key1) in newmodel" :key="key1">
          <input type="checkbox" @click="checkItem(province,key1,1,true)" v-model="province.checkSelf">
          <p @click="addItem(province,key1,1)">{{province.name}}</p>
          <ul v-show="province.showitem">
            <li v-for="(city,key2) in province.item" :key="key2">
              <input type="checkbox" @click="checkItem(city,key2,2,true)" v-model="city.checkSelf">
              <p @click.stop="addItem(city,key2,2)">{{city.name}}</p>
              <ul v-show="city.showitem">
                <li v-for="(county,key3) in city.item" :key="key3">
                  <input type="checkbox" @click="checkItem(county,key3,3,true)" v-model="county.checkSelf">
                  <p>{{county.name}}</p>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="you">
      <ul>
        <li v-for="(province,key1) in this.clonemodel" :key="key1">
          <input type="checkbox" @click="checkItem(province,key1,1)" v-model="province.checkSelf">
          <p @click="addItem(province,key1,1)">{{province.name}}</p>
          <ul v-show="province.showitem">
            <li v-for="(city,key2) in province.item" :key="key2">
              <input type="checkbox" @click="checkItem(city,key2,2)" v-model="city.checkSelf">
              <p @click.stop="addItem(city,key2,2)">{{city.name}}</p>
              <ul v-show="city.showitem">
                <li v-for="(county,key3) in city.item" :key="key3">
                  <input type="checkbox" @click="checkItem(county,key3,3)" v-model="county.checkSelf">
                  <p>{{county.name}}</p>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div>
      <button @click="add">添加</button>
      <button @click="del">删除</button>
    </div>
  </div>
</template>

<script>
import demodata from '../../static/datas.json'
export default {
  data () {
    return {
      mymodel: {},
      province_list: {},
      city_list: {},
      county_list: {},
      newmodel: {},
      clonemodel: {}
    }
  },
  created() {
    // 构建model
    this.newmodel = this.initModel();

  },
  methods: {
    initModel() {
      this.mymodel = demodata.data;
      this.province_list = this.mymodel.province_list;
      this.city_list = this.mymodel.city_list;
      this.county_list = this.mymodel.county_list;
      let obj = {};
      for (const key in this.province_list) {
        if (this.province_list.hasOwnProperty(key)) {
          obj[key] = { // 基本数据model
            "id": key,
            "name": this.province_list[key],
            "type": 'province',
            "item": {},
            "itemHas": false, // 是否填充item
            "showitem": false, // 是否显示item
            "checkSelf": false // 是否选中self
          }
        }
      }
      return obj;
    },
    addItem(select, index, rank, opt) { // 增
      // 1级 省(province)
      // 2级 市(city)
      // 3级 区/县(county)

      // itemHas : true OR false
      // false item未导入,需遍历添加
      // true item已导入,只需遍历操作数据

      if(select.itemHas && !opt) return select.showitem = !select.showitem;
      console.log('addItem');
      let obj = {},
          opts = opt || {},
          indexType,
          modelObj;
      if (typeof index === 'Number')
        index = index + '';
      if (rank == 1) {
        indexType = index.slice(0,2);
        modelObj = this.city_list;
        for (const key in modelObj) {
          if (modelObj.hasOwnProperty(key) && key.slice(0,2) == indexType) {
            obj[key] = {
              "id": key,
              "name": modelObj[key],
              "type": 'city',
              "item": {},
              "itemHas": false, // 是否填充item
              "showitem": false, // 是否显示item
              "checkSelf": opts.checkSelf || false // 是否选中self
            }
          }
        }
      } else if (rank == 2) {
        indexType = index.slice(0,4);
        modelObj = this.county_list;
        for (const key in modelObj) {
          if (modelObj.hasOwnProperty(key) && key.slice(0,4) == indexType) {
            obj[key] = {
              "id": key,
              "name": modelObj[key],
              "type": 'county',
              "checkSelf": opts.checkSelf || false // 是否选中self
            }
          }
        }
      } else {

      }
      select.item = obj; // 添加下级数据Item
      select.itemHas = true; // 标识Item填充
      select.showitem = !select.showitem; // 显示下级数据
    },
    changeItem(select, index, rank, opts) { // 迭代器iterator 改
      console.log(rank)
      let copyRank = rank++;
      for (const key in select.item) {
        if (select.item.hasOwnProperty(key)) {
          if (rank == 3) {
            select.item[key].checkSelf = opts.checkSelf;
          } else {
            select.item[key].showitem = opts.showitem;
            select.item[key].checkSelf = opts.checkSelf;
          }
          
        }

        if (select.item[key].itemHas) { // 还有子集就递归一下
          this.changeItem(select.item[key], key, copyRank, opts);
        }
      }
    },
    checkItem(select, index, rank, sourceType) {
      let sourceObj = {};
    	if (sourceType) {
				sourceObj = this.newmodel;
    	}else {
    		sourceObj = this.clonemodel;
    	}
      let itemBoolean = !select.checkSelf;
      select.checkSelf = itemBoolean;
      console.log(itemBoolean)
      if (select.itemHas) { // 已有下级数据
        this.changeItem(select, index, rank, {
          "showitem": itemBoolean,
          "checkSelf": itemBoolean
        });
      } else {
        this.addItem(select, index, rank, {
          "checkSelf": itemBoolean
        })
        if (rank == 1) {
          for (const key in select.item) {
            if (select.item.hasOwnProperty(key)) {
              this.addItem(select.item[key], key, 2, {
                "checkSelf": itemBoolean
              })
            }
          }
        }
      }

      // 父级联选
      if (rank != 1) {
        let p = index.slice(0, 2);
        let s = index.slice(0, 4);
        p = p + '0000';
        s = s + '00';
        console.log(p,s);
        let flag_province = true;
        let flag = true;
        if (!itemBoolean) { // 删除
          console.log('del');
          // for (const key in this.newmodel[p].item) {
          //   if (this.newmodel[p].item[key].checkSelf) {
          //     flag_province = false;
          //   }
          // }
          // if (flag_province) this.newmodel[p].checkSelf = itemBoolean;

          // for (const key in this.newmodel[p].item[s].item) {
          //   if (this.newmodel[p].item[s].item[key].checkSelf) {
          //     flag = false;
          //   }
          // }
          // this.newmodel[p].item[s].checkSelf = itemBoolean;

          if (rank == 2) {
            // 2
            for (const key in sourceObj[p].item) {
              if (sourceObj[p].item[key].checkSelf) {
                flag = false;
              }
            }
            if (flag) sourceObj[p].checkSelf = itemBoolean;
          } else {
            // 3
            for (const key in sourceObj[p].item[s].item) {
              if (sourceObj[p].item[s].item[key].checkSelf) {
                flag = false;
              }
            }
            if (flag) {
              sourceObj[p].item[s].checkSelf = itemBoolean;
              // 同级市区轮询查找
              for (const key in sourceObj[p].item) {
                if (sourceObj[p].item[key].checkSelf) {
                  flag_province = false;
                }
              }
              if (flag_province) sourceObj[p].checkSelf = itemBoolean;
            }
          }
        } else { // 添加
          console.log('add')
          sourceObj[p].checkSelf = itemBoolean;
          sourceObj[p].item[s].checkSelf = itemBoolean;
        }
      }

      select.showitem = itemBoolean;
    },
    add(data) {
      // 先筛选出符合要求的节点
      // 删除元数据的相应节点

      let newdata;
      newdata = _.cloneDeep(this.newmodel);
      let result = _.filter(newdata, function(cell) {
        return cell.checkSelf == true
      })
      console.log(result); // 符合要求的省份   
      // this.clonemodel = newdata;
      _.forEach(result, function(cell) {
        if (cell.itemHas == true) {
          let shiqu = _.filter(cell.item, function(cellcell) {
            return cellcell.checkSelf == true;
          })
          console.log(shiqu);
          _.forEach(shiqu, function(cellcellcell) {
            let sanji = _.filter(cellcellcell.item, function(cellcellcellcell) {
              return cellcellcellcell.checkSelf == true;
            })
            console.log(sanji);
          })
        }else {
          console.log('出错啦')
        }
      })
    },
    del() {
      console.log('del')
      // delete this.newmodel['110000'];
      // this.newmodel = Object.assign({}, this.newmodel);
      this.clonemodel = {};
    }
  }
}
</script>

<style>
  ul {
    list-style: none;
  }
  li {
    
  }
  li > p {
    cursor: pointer;
    margin: 0px;
    margin-left: 5px;
    display: inline-block;
  }
  .zuo {
    float: left;
    width: 350px;
    height: 400px;
    border: 1px solid red;
    overflow: hidden;
    overflow-y: auto;
  }
  .you {
    margin-left: 100px;
    float: left;
    width: 350px;
    height: 400px;
    border: 1px solid red;
    overflow: hidden;
    overflow-y: auto;
  }
</style>
