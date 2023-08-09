import {
    IconFileExport,
    IconSettings,
    IconHome,
    IconNotebook,
    IconPhotoDollar,
    IconZoomMoney, IconReportMoney, IconPigMoney
} from '@tabler/icons-react';
import { useContext, useState } from 'react';

import { useTranslation } from 'next-i18next';

import HomeContext from '@/pages/api/home/home.context';

import { SettingDialog } from '@/components/Settings/SettingDialog';
import { DonateDialog } from '@/components/Settings/DonateDialog';

import { Import } from '../../Settings/Import';
import { Key } from '../../Settings/Key';
import { SidebarButton } from '../../Sidebar/SidebarButton';
import ChatbarContext from '../Chatbar.context';
import { ClearConversations } from './ClearConversations';
import { PluginKeys } from './PluginKeys';
import {CHATBOT_HOME_PAGE, CHATBOT_USER_MANUAL_PAGE} from "@/utils/app/const";

export const ChatbarSettings = () => {
  const { t } = useTranslation('sidebar');
  const [isSettingDialogOpen, setIsSettingDialog] = useState<boolean>(false);
  const [isDonateDialogOpen, setIsDonateDialog] = useState<boolean>(false);

  const {
    state: {
      apiKey,
      lightMode,
      serverSideApiKeyIsSet,
      serverSidePluginKeysSet,
      conversations,
    },
    dispatch: homeDispatch,
  } = useContext(HomeContext);

  const {
    handleClearConversations,
    handleImportConversations,
    handleExportData,
    handleApiKeyChange,
  } = useContext(ChatbarContext);

  return (
    <div className="flex flex-col items-center space-y-1 border-t border-white/20 pt-1 text-sm">
      {conversations.length > 0 ? (
        <ClearConversations onClearConversations={handleClearConversations} />
      ) : null}

      <Import onImport={handleImportConversations} />

      <SidebarButton
        text={t('Export data')}
        icon={<IconFileExport size={18} />}
        onClick={() => handleExportData()}
      />

      <SidebarButton
          text={t('User manual')}
          icon={<IconNotebook size={18} />}
          onClick={ () => window.open(CHATBOT_USER_MANUAL_PAGE, '_blank')}
      />

      <SidebarButton
        text={t('Settings')}
        icon={<IconSettings size={18} />}
        onClick={() => setIsSettingDialog(true)}
      />

      <SidebarButton
          text={t('Donate')}
          icon={<IconPigMoney size={18} />}
          onClick={() => setIsDonateDialog(true)}
      />

      <SettingDialog
          open={isSettingDialogOpen}
          onClose={() => {
              setIsSettingDialog(false);
          }}
      />

      <DonateDialog
            open={isDonateDialogOpen}
            onClose={() => {
                setIsDonateDialog(false);
            }}
      />
      {/*<SidebarButton*/}
      {/*    text={t('Home page')}*/}
      {/*    icon={<IconHome size={18} />}*/}
      {/*    onClick={ () => window.open(CHATBOT_HOME_PAGE, '_blank')}*/}
      {/*/>*/}

    </div>
  );
};
