/*
 * @Author       : 高江华 g598670138@163.com
 * @Date         : 2022-08-24 01:51:30
 * @LastEditors  : 高江华 g598670138@163.com
 * @LastEditTime : 2022-08-24 02:00:10
 * @FilePath     : \web-B-tmp\src\secondary\progress\index.ts
 * @Description  :
 *
 * Copyright (c) 2022 by 高江华 g598670138@163.com, All Rights Reserved.
 */
import { App } from 'vue'
import progress from './src/index.vue'

// 让这个组件可以通过use的形式使用
export default {
    install(app: App) {
        app.component('g-progress', progress)
    }
}
