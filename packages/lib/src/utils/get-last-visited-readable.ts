import moment from 'moment';
import { i18next } from '@game-trade/lib/services/i18n';

export const getLastVisitedReadable = (last_visited: string | null) => {
  if (!last_visited) return i18next.t('translation.visit.neverVisit', { ns: 'elements' });

  const now = moment().utc();
  const lastVisited = moment(last_visited).utc();

  // 10 to 60 minutes
  if (
    lastVisited < moment().utc().subtract(10, 'minutes') &&
    lastVisited > moment().utc().subtract(60, 'minutes')
  ) {
    const duration = moment.duration(now.diff(lastVisited));
    const minutes = Math.floor(duration.asMinutes());
    return `${i18next.t('translation.visit.lastVisit', { ns: 'elements' })} ${minutes} ${
      minutes > 1
        ? i18next.t('translation.visit.minutes', { ns: 'elements' })
        : i18next.t('translation.visit.minute', { ns: 'elements' })
    } ${i18next.t('translation.visit.ago', { ns: 'elements' })}`;
  }

  // 1 to 24 hours
  if (
    lastVisited < moment().utc().subtract(1, 'hour') &&
    lastVisited > moment().utc().subtract(24, 'hours')
  ) {
    const duration = moment.duration(now.diff(lastVisited));
    const hours = Math.floor(duration.asHours());
    return `${i18next.t('translation.visit.lastVisit', { ns: 'elements' })} ${hours} ${
      hours > 1
        ? i18next.t('translation.visit.hours', { ns: 'elements' })
        : i18next.t('translation.visit.hour', { ns: 'elements' })
    } ${i18next.t('translation.visit.ago', { ns: 'elements' })}`;
  }

  // 1 to 30 days
  if (
    lastVisited < moment().utc().subtract(1, 'day') &&
    lastVisited > moment().utc().subtract(30, 'days')
  ) {
    const duration = moment.duration(now.diff(lastVisited));
    const days = Math.floor(duration.asDays());
    return `${i18next.t('translation.visit.lastVisit', { ns: 'elements' })} ${days} ${
      days > 1
        ? i18next.t('translation.visit.days', { ns: 'elements' })
        : i18next.t('translation.visit.day', { ns: 'elements' })
    } ${i18next.t('translation.visit.ago', { ns: 'elements' })}`;
  }

  // 1 to 12 months
  if (
    lastVisited < moment().utc().subtract(1, 'month') &&
    lastVisited > moment().utc().subtract(12, 'months')
  ) {
    const duration = moment.duration(now.diff(lastVisited));
    const months = Math.floor(duration.asMonths());
    return `${i18next.t('translation.visit.lastVisit', { ns: 'elements' })} ${months} ${
      months > 1
        ? i18next.t('translation.visit.months', { ns: 'elements' })
        : i18next.t('translation.visit.month', { ns: 'elements' })
    } ${i18next.t('translation.visit.ago', { ns: 'elements' })}`;
  }

  // 1 to 10 years
  if (
    lastVisited < moment().utc().subtract(1, 'year') &&
    lastVisited > moment().utc().subtract(10, 'years')
  ) {
    const duration = moment.duration(now.diff(lastVisited));
    const years = Math.floor(duration.asYears());

    return `${i18next.t('translation.visit.lastVisit', { ns: 'elements' })} ${years} ${
      years > 1
        ? i18next.t('translation.visit.years', { ns: 'elements' })
        : i18next.t('translation.visit.year', { ns: 'elements' })
    } ${i18next.t('translation.visit.ago', { ns: 'elements' })}`;
  }

  // Something wrong
  return '-';
};
