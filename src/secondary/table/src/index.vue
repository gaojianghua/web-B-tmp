<template>
    <el-table
        :data="tableData"
        v-loading="isLoading"
        :element-loading-text="elementLoadingText"
        :element-loading-spinner="elementLoadingSpinner"
        :element-loading-background="elementLoadingBackground"
        :element-loading-svg="elementLoadingSvg"
        :element-loading-svg-view-box="elementLoadingSvgViewBox"
        @row-click="rowClick"
        v-bind="$attrs"
    >
        <template v-for="(item, index) in tableOption" :key="index">
            <el-table-column
                v-if="item.prop && !item.action"
                :label="item.label"
                :prop="item.prop"
                :width="item.width"
                :align="item.align"
            >
                <template #default="scope">
                    <template v-if="scope.row.rowEdit">
                        <el-input size="small" v-model="scope.row[item.prop!]"></el-input>
                    </template>
                    <template v-else>
                        <template v-if="scope.$index + scope.column.id === currentEdit">
                            <div style="display: flex">
                                <el-input size="small" v-model="scope.row[item.prop!]"></el-input>
                                <div>
                                    <slot
                                        name="cellEdit"
                                        v-if="$slots.cellEdit"
                                        :scope="scope"
                                    ></slot>
                                    <div class="action-icon" v-else>
                                        <el-icon-check
                                            class="check"
                                            @click.stop="check(scope)"
                                        ></el-icon-check>
                                        <el-icon-close
                                            class="close"
                                            @click.stop="close(scope)"
                                        ></el-icon-close>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template v-else>
                            <slot v-if="item.slot" :name="item.slot" :scope="scope"></slot>
                            <span v-else>{{ scope.row[item.prop!] }}</span>
                            <component
                                :is="`el-icon-${toLine(editIcon)}`"
                                class="edit"
                                v-if="item.editable"
                                @click.stop="clickEditIcon(scope)"
                            ></component>
                        </template>
                    </template>
                </template>
            </el-table-column>
        </template>
        <el-table-column
            v-if="actionOption"
            :label="actionOption!.label"
            :width="actionOption!.width"
            :align="actionOption!.align"
        >
            <template #default="scope">
                <slot name="editRow" :scope="scope" v-if="scope.row.rowEdit"></slot>
                <slot name="action" :scope="scope" v-else></slot>
            </template>
        </el-table-column>
    </el-table>

    <div v-if="pagination && !isLoading" class="pagination" :style="{ justifyContent }">
        <el-pagination
            v-model:currentPage="newCurrentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        ></el-pagination>
    </div>
</template>

<script lang="ts" setup>
import { PropType, computed, ref, watch, onMounted } from 'vue'
import { TableOptions } from './types'
import { toLine } from '@/utils/conversion'
import cloneDeep from 'lodash/cloneDeep'

let props = defineProps({
    // ??????????????????
    options: {
        type: Array as PropType<TableOptions[]>,
        required: true
    },
    // ????????????
    data: {
        type: Array,
        required: true
    },
    // ????????????
    elementLoadingText: {
        type: String
    },
    // ???????????????
    elementLoadingSpinner: {
        type: String
    },
    // ??????????????????
    elementLoadingBackground: {
        type: String
    },
    // ???????????????svg
    elementLoadingSvg: {
        type: String
    },
    // ????????????svg?????????
    elementLoadingSvgViewBox: {
        type: String
    },
    // ?????????????????????
    editIcon: {
        type: String,
        default: 'Edit'
    },
    // ?????????????????????
    isEditRow: {
        type: Boolean,
        default: false
    },
    // ????????????????????????
    editRowIndex: {
        type: String,
        default: ''
    },
    // ??????????????????
    pagination: {
        type: Boolean,
        default: false
    },
    // ???????????????????????????
    paginationAlign: {
        type: String as PropType<'left' | 'center' | 'right'>,
        default: 'left'
    },
    // ??????????????????
    currentPage: {
        type: Number,
        default: 1
    },
    // ???????????????????????????
    pageSize: {
        type: Number,
        default: 10
    },
    // ????????????????????????????????????
    pageSizes: {
        type: Array as PropType<number[]>,
        default: () => [10, 20, 30, 40]
    },
    // ???????????????
    total: {
        type: Number,
        default: 0
    },
    // loading ??????
    isLoading: {
        type: Boolean,
        default: false
    }
})

const newCurrentPage = computed({
    get: () => props.currentPage,
    set: (val: number) => {
        emits('update:currentPage', val)
    }
})

let emits = defineEmits([
    'confirm',
    'cancel',
    'update:editRowIndex',
    'size-change',
    'current-change',
    'update:currentPage'
])

// ??????????????????????????????
let handleSizeChange = (val: number) => {
    emits('size-change', val)
    // console.log(val)
}
// ??????????????????
let handleCurrentChange = (val: number) => {
    emits('current-change', val)
    // console.log(val)
}

// ????????????????????????????????????
let currentEdit = ref<string>('')

// ???????????????????????????
let tableData = ref<any[]>(cloneDeep(props.data))
// ???????????????????????????
let cloneEditRowIndex = ref<string>(props.editRowIndex)
// ??????data??????????????? ????????????tableData??????
watch(
    () => props.data,
    (val) => {
        tableData.value = val
        tableData.value.map((item) => {
            item.rowEdit = false
        })
    },
    { deep: true }
)

// ??????
watch(
    () => props.editRowIndex,
    (val) => {
        if (val) cloneEditRowIndex.value = val
    }
)

onMounted(() => {
    tableData.value.map((item) => {
        item.rowEdit = false
    })
})

// ??????????????????????????????
let tableOption = computed(() => props.options.filter((item) => !item.action))
// ?????????
let actionOption = computed(() => props.options.find((item) => item.action))

// ???????????????????????????
let justifyContent = computed(() => {
    if (props.paginationAlign === 'left') return 'flex-start'
    else if (props.paginationAlign === 'right') return 'flex-end'
    else return 'center'
})

// ??????????????????
let clickEditIcon = (scope: any) => {
    // ?????????????????? ???????????????????????????????????????
    // ??????$index???column???id
    currentEdit.value = scope.$index + scope.column.id
    // console.log(currentEdit.value)
}

// ????????????
let check = (scope: any) => {
    emits('confirm', scope)
    currentEdit.value = ''
}
// ????????????
let close = (scope: any) => {
    emits('cancel', scope)
    currentEdit.value = ''
}

// ??????????????????
let rowClick = (row: any, column: any) => {
    // console.log(column.label, actionOption.value!.label)
    if (!actionOption.value) return
    // ?????????????????????????????????
    if (column.label === actionOption.value!.label) {
        if (props.isEditRow && cloneEditRowIndex.value === props.editRowIndex) {
            // ??????????????????
            row.rowEdit = !row.rowEdit
            // ?????????????????????rowEdit
            tableData.value.map((item) => {
                if (item !== row) item.rowEdit = false
            })
            // ?????????????????????
            if (!row.rowEdit) emits('update:editRowIndex', '')
        }
    }
}
</script>

<style lang="scss" scoped>
.edit {
    width: 1em;
    height: 1em;
    margin-left: 8px;
    cursor: pointer;
    display: inline-block;
}
.action-icon {
    display: flex;
    height: 100%;
    align-items: center;
    svg {
        width: 1em;
        height: 1em;
        margin-left: 8px;
        cursor: pointer;
    }
    .check {
        color: red;
    }
    .close {
        color: green;
    }
}
.pagination {
    margin-top: 16px;
    display: flex;
}
.center {
    display: flex;
    align-items: baseline;
    justify-content: center;
}
.cell {
    display: flex;
}
</style>
