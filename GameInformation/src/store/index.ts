import { defineStore } from 'pinia'
 
export const useSwitchFlag = defineStore('flag',{
    state:() => {
        return {
            flag: true,
        }
    },
    actions:{
        update() {
            this.flag = !this.flag
        },
    }
})