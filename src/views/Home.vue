<template>
	<el-row
		class="container">
		<el-col
			:span="24"
			class="header">
			<el-col
				:span="10"
				class="logo"
				:class="collapsed ? 'logo-collapse-width' : 'logo-width'">
				<a href="/main"> {{ collapsed ? '' : sysName }}</a>
			</el-col>
			<el-col
				:span="1" class="ui-tool">
				<div
					class="tools"
					@click.prevent="collapse">
					<i class="el-icon-menu"></i>
				</div>
			</el-col>
			<el-col :span="12" class="breadcrumb-container">
				<el-breadcrumb
					separator="/"
					class="breadcrumb-inner">
					<!-- 路由记录生成面包屑 -->
					<el-breadcrumb-item
						v-for="item in $route.matched"
						:key="item.path">
						<span>{{ item.name }}</span>
					</el-breadcrumb-item>
				</el-breadcrumb>
			</el-col>
			<el-col
				:span="6"
				class="userinfo">
				<el-dropdown
					trigger="hover">
					<span
						class="el-dropdown-lick userinfo-inner">
						<img src="../assets/images/avatar.png" />
						{{ sysUserName }}
					</span>
					<el-dropdown-menu
						slot="dropdown">
						<el-dropdown-item
							@click.native="userInfoVisible = true">
							修改密码
						</el-dropdown-item>
						<el-dropdown-item
							divided
							@click.native="logout">
							退出登录
						</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
		<el-col
			:span="24"
			class="main">
			<aside
				:class="collapsed ? 'menu-collapsed' : 'menu-expanded'"  v-if="!appCollapsed">
				<!--导航菜单-->
				<el-menu
					:default-active="$route.path"
					background-color="#2b3335"
					text-color="#fff"
					:collapse="collapsed"
					unique-opened
					router
					>
					<template
						v-for="(item, index) in menus"
						v-if="!item.hidden">
						<el-submenu 
						    :key="index"
							:index="index+''"
							v-if="!item.leaf" ref="navMenu">
							<template slot="title">
								<i :class="item.menuIcon"></i>
								<span slot="title">{{ item.menuName }}</span>
							</template>
							<el-menu-item
								v-for="child in item.subMenu"
								:index="'/' + child.menuUrl"  
								:key="'/' + child.menuUrl">
								{{ child.menuName }}
							</el-menu-item>
						</el-submenu>
					</template>
				</el-menu>
			</aside>
			<section
				class="content-container">
				<div
					class="grid-content bg-purple-light">
					<!-- 此处放置el-tabs代码 -->
					<div class="nav-tabs">
						<el-tabs
							v-model="activeIndex"
							type="card"
							closable
							@tab-click="tabClick"
							v-if="options.length"
							@tab-remove="tabRemove">
							<el-tab-pane
								:key="item.name"
								v-for="(item) in options"
								:label="item.name"
								:name="item.route">
								
								<el-col
									:span="24"
									class="content-wrapper" v-bind:style="{ 'height': contentHeight }">
									<transition
										name="fade"
										mode="out-in">
										<keep-alive>
											<router-view></router-view>
										</keep-alive>
									</transition>
								</el-col>
							</el-tab-pane>
						</el-tabs>
					</div>
				</div>
			</section>
		</el-col>

		<el-dialog class="my-dialog" title="修改密码" :visible.sync="userInfoVisible"  :width="dialogWidth">
			<el-form ref="userForm" :model="form" :rules="userRules">
				<el-form-item prop="password" label="旧密码" label-width="80px">
					<el-input type="password" v-model="form.password" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item prop="newPassword" label="新密码" label-width="80px">
					<el-input type="password" v-model="form.newPassword" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item prop="confirmPassword" label="再次输入" label-width="80px">
					<el-input type="password" v-model="form.confirmPassword" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="userInfoVisible = false">取 消</el-button>
				<el-button type="primary" @click="userInfoVisible = false">确 定</el-button>
			</div>
		</el-dialog>
	</el-row>
</template>
<script>
    import api from '../api'
    import menus from '../mock/data/menus';
    import { mapGetters } from 'vuex';
	export default {
		data() {
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.form.newPassword) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				sysName: 'vue-admin-tabs',
				collapsed: false,
				appCollapsed: false,
				sysUserName: '',
				sysUserAvatar: '',
				form: {
					password: '',
					newPassword: '',
					confirmPassword: ''
				},
				userRules: {
					password: [
						{ required: true, message: '请输入旧密码', trigger: 'blur' },
					],
					newPassword: [
						{ required: true,  message: '请输入新密码', trigger: 'blur' },
					],
					confirmPassword: [
						{ validator: validatePass,  trigger: 'blur' },
					]
				},
				user : {},
                userInfoVisible: false,
                contentHeight: (document.documentElement.clientHeight - 125) + 'px',
                dialogWidth: '400px'
			};
		},
		methods: {
			// 退出登录
			logout() {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
				}).then(() => {
					sessionStorage.removeItem('user');
					_this.$store.state.options = [];
					_this.$router.push('login');
				}).catch(() => {

				});
			},
			// 折叠导航栏
			collapse() {
				this.collapsed=!this.collapsed;
			},
			// tab切换时，动态的切换路由
			tabClick (tab) {
                let path = this.activeIndex;
                console.info("p:", path)
				this.$router.push({path: path});
			},
			tabRemove (targetName) {
				// 首页不可删除
				if(targetName == 'index') {
					return;
				}
				this.$store.commit('delete_tabs', targetName);
				if (this.activeIndex === targetName) {
					// 设置当前激活的路由
					if (this.options && this.options.length >= 1) {
						this.$store.commit('set_active_index', this.options[this.options.length-1].route);
						this.$router.push({path: this.activeIndex});
					} else {
						this.$router.push({path: 'index'});
					}
				}
            },
            getMenus() {
                return this.$store.dispatch('menu/getMenus');
            }
		},
		computed: {
			options () {
				return this.$store.state.options;
            },
            menus() {
				if (!this.$store.getters['menu/menus'].length) {
					this.getMenus();
				}
				return this.$store.getters['menu/menus'];
			},
			activeIndex: {
				get () {
					return this.$store.state.activeIndex;      
				},
				set (val) {
					this.$store.commit('set_active_index', val);
				}
            }
		},
	    watch: {
			'$route'(to) {
				let flag = false;
				if (to.path == '/') {
					return;
                }
				for (let option of this.options ) {
					if (option.name === to.name) {
						flag = true;
						this.$store.commit('set_active_index',  to.path.split('/')[1]);
						break
					}
				}
				if (!flag) {
					this.$store.commit('add_tabs', {route:  to.path.split('/')[1], name: to.name});
					this.$store.commit('set_active_index',  to.path.split('/')[1]);
				}
			},
		},
		created() {
            
		},
		mounted() {
			this.user = sessionStorage.getItem('user');
			if (this.user) {
				this.user = JSON.parse(this.user);
				this.sysUserName = this.user.nickName || '';
				this.sysUserAvatar = this.user.avatar || '';
			}
			// 刷新时以当前路由做为tab加入tabs
			if (this.$route.path !== '/index') {
				this.$store.commit('add_tabs', {route: 'index', name: '首页'});
				this.$store.commit('add_tabs', {route: this.$route.path , name: this.$route.name });
				this.$store.commit('set_active_index', this.$route.path);
			} else {
				this.$store.commit('add_tabs', {route: 'index', name: '首页'});
				this.$store.commit('set_active_index', 'index');
				this.$router.push('index');
			}
        }
	}
</script>
<style scoped lang="scss">
@import "../assets/styles/home.scss";
</style>