import LoadableComponent from './../Loadable/index';

export const adminRouters: any = [
  //#region none display
  {
    path: "/admin",
    exact: true,
    component: LoadableComponent(
      () => import("../../components/Layout/AdminLayout")
    ),
    isLayout: true,
  },
  {
    path: "/admin/dashboard",
    exact: true,
    component: LoadableComponent(() => import("../../scenes/AdminAreas/Dashboard"))
  },
  {
    path: "/admin/setting-menu",
    exact: true,
    component: LoadableComponent(() => import("../../scenes/AdminAreas/MenuSetting"))
  },
  {
    path: "/admin/phan-he",
    exact: false,
    component: LoadableComponent(() => import("../../scenes/OAuthAreas/Permission/TenantAdministrator"))
  },
  {
    path: "/admin/role-internal",
    exact: true,
    component: LoadableComponent(() => import("../../scenes/OAuthAreas/Permission/RoleInternal"))
  },
  {
    path: "/admin/role-permission",
    exact: true,
    component: LoadableComponent(() => import("../../scenes/OAuthAreas/Permission/RolePermission"))
  },
  {
    path: '/admin',
    exact: true,
    component: LoadableComponent(() => import('../../scenes/AdminAreas/Dashboard'))
  }
  //#endregion
];

export const userRouter: any = [
  {
    path: '/',
    exact: true,
    name: 'user',
    title: 'User',
    component: LoadableComponent(() => import('../../components/Layout/UserLayout')),
    isLayout: true,
    showInMenu: false,
    index: 0
  },
  {
    path: '/home',
    name: 'Home',
    title: 'Trang chủ',
    component: LoadableComponent(() => import('../../scenes/AppAreas/Home')),
    showInMenu: false,
    index: 0
  },
  {
    path: '/login',
    name: 'login',
    title: 'Đăng Nhập',
    component: LoadableComponent(() => import('../../scenes/OAuthAreas/Login')),
    showInMenu: false,
    index: 0
  },
  {
    path: '/token',
    name: 'Token',
    title: 'Xác thực',
    component: LoadableComponent(() => import('../../scenes/OAuthAreas/Login')),
    showInMenu: false,
    index: 0
  },
  {
    path: '/change-password',
    name: 'change password',
    title: 'Thay đổi mật khẩu',
    component: LoadableComponent(() => import('../../scenes/OAuthAreas/Login')),
    showInMenu: false,
    index: 0
  },
  {
    path: '/forgot-password',
    name: 'forgotPassword',
    title: 'Lấy lại mật khẩu',
    component: LoadableComponent(() => import('../../scenes/OAuthAreas/Login')),
    showInMenu: false,
    index: 0
  },
  {
    path: '/Signup',
    name: 'Signup',
    title: 'Đăng Ký',
    component: LoadableComponent(() => import('../../scenes/OAuthAreas/Login')),
    showInMenu: false,
    index: 0
  },
  {
    path: '/Logout',
    name: 'Logout',
    title: 'Đăng Xuất',
    component: LoadableComponent(() => import('../../scenes/OAuthAreas/Login')),
    showInMenu: false,
    index: 0
  }
];


export const routers = [...adminRouters, ...userRouter];
