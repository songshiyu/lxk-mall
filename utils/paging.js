/** 瀑布流对象 */
import { Http } from "../utils/Http.js"

class pageing{

    count
    start
    req
    locker = false
    url
    moreData = true
    accumulator = []

    constructor(req,count = 10,start = 0){
        this.req = req
        this.count = count
        this.start = start
        this.url = req.url
    }

    async getMoreData(){
        //判断是否有更多数据
        if(!this.moreData){
            return
        }
        //获取锁
        if(!this._getLocker){
            return
        }
        //若获取到锁，执行以下逻辑
        const data = await this._actualGetData()
        //释放锁
        this._releaseLocker
        return data
    }

    async _actualGetData(){
        const req = this._getCurrentReq()
        let paging = await Http.request(req)
        if(!paging){
            return
        }
        if(paging.totoal === 0){
            return {
                empty:true,
                items:[],
                moreData:false,
                accumulator:[]
            }
        }
        this.moreData = this._ifMoreData(paging.total_page,paging.page)
        if(this.moreData){
            this.start += this.count
        }
        this._accumulator(paging.items)
        return {
            empty:false,
            items:paging.items,
            moreData:this.moreData,
            accumulator: this.accumulator
        }
    }

    _accumulator(items){
        this.accumulator = this.accumulator.concat(items)
    }

    _ifMoreData(totalPage,pageNum){
        return pageNum < totalPage - 1
    }

    _getCurrentReq(){
        let url = this.url
        const params = `start=${this.start}&count=${this.count}`
        if(url.includes("?")){
            url += '&' + params
        }else{
            url += '?' + params
        }
        this.req.url = url
        return this.req
    }

    _getLocker(){
        if(this.locker){
            return false
        }
        this.locker = true
        return true
    }

    _releaseLocker(){
        this.locker = false
    }
}

export{
    pageing
}