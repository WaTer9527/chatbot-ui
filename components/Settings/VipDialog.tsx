import {FC, useContext, useEffect} from 'react';
import { Table } from 'antd';
import { useTranslation } from 'next-i18next';
import Cookies from 'js-cookie';
import { IconVip, IconVipOff, IconX, IconMoodBoy } from '@tabler/icons-react';
import HomeContext from "@/pages/api/home/home.context";

interface Props {
    open: boolean;
    onClose: () => void;
}

export const VipDialog: FC<Props> = ({ open, onClose }) => {
    const { t } = useTranslation('settings');

    const {
        dispatch: homeDispatch,
    } = useContext(HomeContext);

    const nickname = Cookies.get('nickname') || '匿名用户';
    const avatar = Cookies.get('avatarUrl');
    const member = Cookies.get('member') === 'true';
    useEffect(() => {
        if (open) {
            const isVip = Cookies.get('member') === 'true';
            homeDispatch({ field: 'isVip', value: isVip });
        }
    }, [open]);
    const expiryTimestamp = Cookies.get('expireTime');
    const expiryDate = expiryTimestamp ? new Date(Number(expiryTimestamp)).toLocaleString() : '无';
    const serverUrl = Cookies.get('serverUrl');

    const products = [
        {membership: '黄金会员', period: '1天', description: '描述', price: '9元', link: `${serverUrl}/purchase/product/1`},
        {membership: '黄金会员', period: '1周', description: '描述', price: '39元', link: `${serverUrl}/purchase/product/2`},
        {membership: '黄金会员', period: '1月', description: '描述', price: '99元', link: `${serverUrl}/purchase/product/3`},
    ];

    const benefits = [
        {type: '基础版', nonMember: '30次/日', member: '80次/日'},
        {type: '高级版', nonMember: '不可使用', member: '20次/日'},
    ];

    const className = 'bg-white dark:bg-[#202123] text-black dark:text-neutral-400';
    const greenTextClassName = 'text-green-600 bg-white dark:bg-[#202123]';
    const rowClassName = 'hover:bg-gray-500';

    const productColumns = [
        {
            title: '会员类型',
            dataIndex: 'membership',
            key: 'membership',
            className: className
        },
        {
            title: '购买时长',
            dataIndex: 'period',
            key: 'period',
            className: className
        },
        {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
            className: className
        },
        {
            title: "购买链接",
            dataIndex: 'link',
            key: 'link',
            render: (text: string) => <a href={text} target="_blank" className="underline hover:underline">购买</a>,
            className: greenTextClassName
        },
    ];

    const benefitColumns = [
        {
            title: '聊天模型',
            dataIndex: 'type',
            key: 'type',
            className: className,
        },
        { title: '非会员', dataIndex: 'nonMember', key: 'nonMember', className: className },
        { title: '黄金会员', dataIndex: 'member', key: 'member', className: greenTextClassName },
    ];

    if (!open) {
        return <></>;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="fixed inset-0 z-10 overflow-hidden">
                <div className="flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0">
                    <div className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true" />

                    <div className="inline-block max-h-[650px] transform rounded-lg border border-gray-300 bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all dark:bg-[#202123] sm:my-8 sm:max-h-[700px] sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
                        <button type="button" className="absolute top-1 right-1 text-black dark:text-neutral-200" onClick={onClose}>
                            <IconX size={18} />
                        </button>

                        <div className="flex items-center space-x-2 mb-6">
                            {avatar ? (
                                <img src={avatar} alt="User Avatar" className="rounded-full" width="50" height="50" />
                            ) : (<IconMoodBoy size={50} />)}
                            <div className="text-xl font-bold text-black dark:text-neutral-200">{nickname}</div>

                        </div>

                        {member ? (
                            <div className="flex items-center space-x-2 mb-6 text-green-500">
                                <IconVip size={18} color="gold"/>
                                <p>黄金会员 到期时间: {expiryDate}</p>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2 mb-6 text-yellow-500">
                                <IconVipOff size={18}/>
                                <p>非会员</p>
                            </div>
                        )}

                        <div className="mb-4">
                            <div className="font-bold text-black dark:text-neutral-200">购买会员</div>
                            <Table
                                   columns={productColumns}
                                   dataSource={products}
                                   showHeader={false}
                                   pagination={false} />
                        </div>

                        <div className="my-6"></div>

                        <div className='mb-4'>
                            <div className="font-bold text-black dark:text-neutral-200">会员权益说明</div>
                            <Table
                                className="no-hover"
                                columns={benefitColumns} dataSource={benefits} pagination={false} />
                        </div>

                        <div className="my-6"></div>

                        <a href={`${serverUrl}/account/`} target="_blank" rel="noopener noreferrer" className="hover:underline text-black dark:text-neutral-200">进入我的账户</a>
                    </div>
                </div>
            </div>
        </div>
    );
};