<!--
 * @Author       : 高江华 g598670138@163.com
 * @Date         : 2022-08-24 03:12:47
 * @LastEditors  : 高江华 g598670138@163.com
 * @LastEditTime : 2022-09-01 07:44:35
 * @FilePath     : \web-B-tmp\src\views\role-list\index.vue
 * @Description  : 
 * 
 * Copyright (c) 2022 by 高江华 g598670138@163.com, All Rights Reserved. 
-->
<template>
    <div class="">
        <el-card>
            <g-table
                :options="options"
                :data="roleList"
                elementLoadingText="加载中..."
                elementLoadingBackground="rgba(0,0,0,.8)"
                :element-loading-svg="svg"
                element-loading-svg-view-box="-10, -10, 50, 50"
                stripe
                border
                :isLoading="isLoading"
            >
                <template #id="{ scope }">
                    <span>{{ scope.row.id }}</span>
                </template>
                <template #title="{ scope }">
                    <span>{{ scope.row.title }}</span>
                </template>
                <template #desc="{ scope }">
                    <span>{{ scope.row.desc }}</span>
                </template>
                <template #action="{ scope }">
                    <el-button
                        size="small"
                        type="primary"
                        v-permission="['distributePermission']"
                        @click="onOpenDistributionDialog(scope.row)"
                        >{{ $t('role.assignPermissions') }}</el-button
                    >
                </template>
            </g-table>
        </el-card>
        <distribution-role-vue
            v-model="distributionVisible"
            :roleId="String(roleId)"
        ></distribution-role-vue>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { userManageApi } from '@/api'
import { watchSwitchLang } from '@/utils/routeI18n'
import { useI18n } from 'vue-i18n'
import distributionRoleVue from './components/distribution-role.vue'

const i18n = useI18n()
const isLoading = ref<boolean>(false)
// 控制dialog显示
const distributionVisible = ref<boolean>(false)
// table配置
let options = ref<any[]>([])
const initOptions = () => {
    options.value = [
        {
            prop: 'id',
            label: i18n.t('role.index'),
            align: 'center',
            slot: 'id'
        },
        {
            prop: 'title',
            label: i18n.t('role.name'),
            align: 'center',
            slot: 'title'
        },
        {
            prop: 'desc',
            label: i18n.t('role.desc'),
            align: 'center',
            slot: 'desc'
        },
        {
            label: i18n.t('role.action'),
            action: true,
            align: 'center'
        }
    ]
}
initOptions()
const svg = `
        <path class="path" d="
            M 30 15
            L 28 17
            M 25.61 25.61
            A 15 15, 0, 0, 1, 15 30
            A 15 15, 0, 1, 1, 27.99 7.5
            L 15 15
            " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
        `
/**
 * 获取角色列表数据
 * */
const roleList = ref<any[]>([])
const getRoleList = async () => {
    roleList.value = await userManageApi.getRoleList()
}
getRoleList()
watchSwitchLang(getRoleList, initOptions)
// 分配权限
const roleId = ref<String>('')
const onOpenDistributionDialog = (row: any) => {
    distributionVisible.value = true
    roleId.value = row.id
}
</script>

<style lang="scss" scoped></style>
