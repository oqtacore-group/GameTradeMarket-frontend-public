import { LoopbackQuery } from '@game-trade/lib/src/codegen-types';

export interface ILogsProviderValue {
  loopbackQuery: () => void;
  logData: LoopbackQuery | undefined;
  logLoading: boolean;
}
