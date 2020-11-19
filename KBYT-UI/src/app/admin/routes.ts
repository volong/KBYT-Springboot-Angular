export interface RouterInfo {
    title: string,
    path: string,
    icon: string,
}

export const ROUTEINFOS: RouterInfo[] = [
    {
        path: 'table',
        title: 'Bảng',
        icon: 'table'
    },
    {
        path: 'chart/persons-chart',
        title: 'Biểu đồ',
        icon: 'line-chart'
    },
    {
        path: 'account',
        title: 'Tài khoản',
        icon: 'user'
    }
]