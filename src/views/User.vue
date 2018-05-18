<template>
<div>
    <el-form :inline="true" :model="filters">
        <el-form-item>
            <el-input v-model="filters.name" placeholder="待查询的姓名"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" v-on:click="getUsers">查询</el-button>
        </el-form-item>
    </el-form>
    <el-table :data="currentUsers" highlight-current-row size="mini" v-loading="loading" @selection-change="selsChange"
		style="width: 100%;">
			<el-table-column type="selection" width="55">
            </el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="120" >
			</el-table-column>
			<el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" >
			</el-table-column>
			<el-table-column prop="age" label="年龄" width="100" >
			</el-table-column>
			<el-table-column prop="birth" label="生日" width="120" >
			</el-table-column>
			<el-table-column prop="addr" label="地址" min-width="180" >
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template slot-scope="scope">
					<el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
        <el-button type="danger" @click="batchRemove">批量删除</el-button>
        <el-pagination
            layout="sizes, total, prev, pager, next"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="pageSizes"
            :total="total"
            style="float:right;">
        </el-pagination>
    </el-col>
</div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            filters: {
                name: '',
            },
            page: 1,
            pageSize: 10,
            pageSizes: [10, 20, 30, 50],
        }
    },
    mounted() {
        this.getUsers();
    },
    computed: {
        currentUsers() {
			const start = (this.page - 1) * this.pageSize;
            const end = this.page * this.pageSize;
            return this.users.slice(start, end);
        },
        ...mapGetters('users', [
            'users',
            'total',
            'loading'
		])
    },
    methods: {
        getUsers() {
            let para = {
                page: this.page,
                name: this.filters.name,
            };
            this.$store.dispatch('users/getUsers', para);
        },
        // 性别显示转换
        formatSex: function (row, column) {
            return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
        },
        // 改变页容量
        handleSizeChange(val) {
            this.pageSize = val;
        },

        // 翻页
        handleCurrentChange(val) {
            this.page = val;
        },
        handleDel(index, row) {
            this.$confirm('确认删除该记录吗?', '提示', {
                type: 'warning'
            }).then(() => {
                let para = {
                    id: row.id,
                    page: this.page,
                    name: this.filters.name,
                };
                this.$store.dispatch('users/removeUser', para).then(() => {
                    this.$message({
                        message: '删除成功',
                        type: 'success',
                    });
                }).catch((res) => {
                    this.$message({
                        message: '删除失败了哦!',
                        type: 'error',
                    });
                });
            }).catch(() => {

            });
        },
        selsChange: function (sels) {
			this.sels = sels;
        },
        // 批量删除
        batchRemove: function () {
            var ids = this.sels.map(item => item.id).toString();
            this.$confirm('确认删除选中记录吗？', '提示', {
                type: 'warning',
            }).then(() => {
                let para = Object.assign({}, { ids: ids }, {
                    all: {
                        page: this.page,
                        name: this.filters.name,
                    },
                });
                this.$store.dispatch('users/batchRemoveUser', para);
            }).catch(() => {

            });
        }
    }
}
</script>
<style lang="scss" scoped>
.toolbar {
    padding-top: 10px;
}
</style>

