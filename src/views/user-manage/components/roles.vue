<!--
 * @Author       : 高江华 g598670138@163.com
 * @Date         : 2022-09-01 04:31:43
 * @LastEditors  : 高江华 g598670138@163.com
 * @LastEditTime : 2022-09-01 05:32:13
 * @FilePath     : \web-B-tmp\src\views\user-manage\components\roles.vue
 * @Description  : 
 * 
 * Copyright (c) 2022 by 高江华 g598670138@163.com, All Rights Reserved. 
-->
<template>
    <el-dialog :title="$t('excel.roleDialogTitle')" :model-value="modelValue" @close="onClose">
        <el-checkbox-group v-model="userRole">
            <el-checkbox
                v-for="item in allRole"
                :key="item.id"
                :label="item.title"
                :indeterminate="false"
            ></el-checkbox>
        </el-checkbox-group>

        <template #footer>
            <div>
                <el-button @click="onClose">{{ $t('universal.cancel') }}</el-button>
                <el-button type="primary" @click="onConfirm">{{
                    $t('universal.confirm')
                }}</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { userManageApi } from '@/api'
import { watchSwitchLang } from '@/utils/routeI18n'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    userId: {
        type: Number,
        required: true
    }
})
const emits = defineEmits(['update:modelValue', 'updateRole'])

// 获取所有角色
const allRole = ref<any[]>([])
const getRoleList = async () => {
    allRole.value = await userManageApi.getRoleList()
}
getRoleList()
watchSwitchLang(getRoleList)

// 当前用户角色
const userRole = ref<any[]>([])
const getUserRole = async (id: number) => {
    const res = await userManageApi.getUserRole(id)
    userRole.value = res.role.map((item: any) => item.title)
}

// 关闭事件
const onClose = () => {
    emits('update:modelValue', false)
}
// 确定事件
const onConfirm = async () => {
    const roles = userRole.value.map((title) => {
        return allRole.value.find((role) => role.title === title)
    })
    await userManageApi.updateUserRole({ userId: props.userId, roles })
    ElMessage.success(i18n.t('role.updateRoleSuccess'))
    emits('updateRole')
    onClose()
}
// 监听userId的传入
watch(() => props.userId, getUserRole)
</script>

<style lang="scss" scoped></style>
