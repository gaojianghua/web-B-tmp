/*
 * @Author       : 高江华 g598670138@163.com
 * @Date         : 2022-08-24 03:12:46
 * @LastEditors  : 高江华 g598670138@163.com
 * @LastEditTime : 2022-08-28 04:23:54
 * @FilePath     : \web-B-tmp\src\mock\user.ts
 * @Description  :
 *
 * Copyright (c) 2022 by 高江华 g598670138@163.com, All Rights Reserved.
 */
let profile = {
    title: '前端开发工程师',
    nickname: '高江华',
    vipLevel: 5,
    company: '',
    introduction: '我自横刀向天笑, 去留肝胆两昆仑',
    homePage: 'https://gaojianghua.cn/doce',
    avatar: 'https://gaojianghua.oss-cn-hangzhou.aliyuncs.com/home/%E7%81%B0%E5%A4%AA%E7%8B%BC.png'
}

let feature = [
    {
        id: 0,
        title: 'Vue3 + 全家桶',
        percentage: 100,
        content:
            '项目基于最新的<a target="_blank" href="https://v3.cn.vuejs.org/guide/introduction.html">Vue3</a>全家桶进行开发, 全面使用最新的<a target="_blank" href="https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md">RFC script setup</a>语法标准, 为你带来不一样的 vue3 开发体验'
    },
    {
        id: 1,
        title: 'Vue3 + 全家桶',
        percentage: 100,
        content:
            '项目基于最新的<a target="_blank" href="https://v3.cn.vuejs.org/guide/introduction.html">Vue3</a>全家桶进行开发, 全面使用最新的<a target="_blank" href="https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md">RFC script setup</a>语法标准, 为你带来不一样的 vue3 开发体验'
    },
    {
        id: 2,
        title: 'Vue3 + 全家桶',
        percentage: 100,
        content:
            '项目基于最新的<a target="_blank" href="https://v3.cn.vuejs.org/guide/introduction.html">Vue3</a>全家桶进行开发, 全面使用最新的<a target="_blank" href="https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md">RFC script setup</a>语法标准, 为你带来不一样的 vue3 开发体验'
    }
]

let chapter = [
    {
        id: 0,
        timestamp: '2022-08-28',
        content: '123'
    },
    {
        id: 1,
        timestamp: '2022-08-29',
        content: '145623'
    }
]

export default {
    getProfile: () => {
        return {
            code: 200,
            data: profile,
            msg: '登录成功'
        }
    },
    getFeature: () => {
        return {
            code: 200,
            data: feature,
            msg: '登录成功'
        }
    },
    getChapter: () => {
        return {
            code: 200,
            data: chapter,
            msg: '登录成功'
        }
    }
}
