import { FC } from 'react';
import { useTranslation } from 'next-i18next';
import Cookies from 'js-cookie';
import { IconVip, IconVipOff, IconX, IconMoodBoy } from '@tabler/icons-react';

interface Props {
    open: boolean;
    onClose: () => void;
}

export const VipDialog: FC<Props> = ({ open, onClose }) => {
    const { t } = useTranslation('settings');

    const nickname = Cookies.get('nickname') || '匿名用户';
    const avatar = Cookies.get('avatarUrl');
    const member = Cookies.get('member') === 'true';
    const expiryTimestamp = Cookies.get('expireTime');
    const expiryDate = expiryTimestamp ? new Date(Number(expiryTimestamp)).toLocaleString() : '无';
    const serverUrl = Cookies.get('serverUrl');

    if (!open) {
        return <></>;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="fixed inset-0 z-10 overflow-hidden">
                <div className="flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0">
                    <div className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true" />

                    <div className="inline-block max-h-[650px] transform rounded-lg border border-gray-300 bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all dark:bg-[#202123] sm:my-8 sm:max-h-[650px] sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
                        <button type="button" className="absolute top-1 right-1" onClick={onClose}>
                            <IconX size={18} />
                        </button>

                        <div className="flex items-center space-x-2 mb-6">
                            {avatar ? (
                                <img src={avatar} alt="User Avatar" className="rounded-full" width="50" height="50" />
                            ) : (<IconMoodBoy size={50} />)}
                            <div className="text-xl font-bold text-black dark:text-neutral-200">{nickname}</div>
                        </div>

                        <div className="mb-6">
                            <p className={member ? "text-green-500" : "text-yellow-500"}>{member ? "可享每日20次GPT-4对话" : "开通会员可享每日20次GPT-4对话" }</p>
                        </div>

                        {member ? (
                            <div className="flex items-center space-x-2 mb-6">
                                <IconVip size={18} color="gold"/>
                                <p>会员到期时间: {expiryDate}</p>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2 mb-6">
                                <IconVipOff size={18}/>
                                <p>非会员</p>
                            </div>
                        )}

                        <div className="mb-6">
                            <p className="mb-4">{member ? "续费会员：" : "开通会员："}</p>
                            <div className="flex flex-col space-y-2">
                                <div className="flex justify-between items-center space-x-2 border p-2 rounded hover:bg-green-500 transition-colors">日卡 <span>9元</span> <a href={`${serverUrl}/purchase/product/1`} className="btn" target="_blank">购买</a></div>
                                <div className="flex justify-between items-center space-x-2 border p-2 rounded hover:bg-green-500 transition-colors">周卡 <span>39元</span> <a href={`${serverUrl}/purchase/product/2`} className="btn" target="_blank">购买</a></div>
                                <div className="flex justify-between items-center space-x-2 border p-2 rounded hover:bg-green-500 transition-colors">月卡 <span>130元</span> <a href={`${serverUrl}/purchase/product/3`} className="btn" target="_blank">购买</a></div>
                            </div>
                        </div>

                        <a href={`${serverUrl}/account`} target="_blank" rel="noopener noreferrer" className="hover:underline">进入我的账户</a>
                    </div>
                </div>
            </div>
        </div>
    );
};