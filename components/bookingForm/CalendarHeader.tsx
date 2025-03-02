import { type CalendarState } from 'react-stately';
import { FocusableElement, DOMAttributes } from '@react-types/shared';
import { type AriaButtonProps } from '@react-aria/button';
import { useDateFormatter } from '@react-aria/i18n';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { CalendarButton } from './CalendarButton';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

export function CalendarHeader({
  state,
  calendarProps,
  prevButtonProps,
  nextButtonProps,
}: {
  state: CalendarState;
  calendarProps: DOMAttributes<FocusableElement>;
  prevButtonProps: AriaButtonProps<'button'>;
  nextButtonProps: AriaButtonProps<'button'>;
}) {
  const monthDateFormatter = useDateFormatter({
    month: 'short',
    year: 'numeric',
    timeZone: state.timeZone,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [monthName, _, year] = monthDateFormatter
    .formatToParts(state.visibleRange.start.toDate(state.timeZone))
    .map((part) => part.value);

  return (
    <div className="flex items-center pb-4">
      <VisuallyHidden>
        <h2>{calendarProps['aria-label']}</h2>
      </VisuallyHidden>
      <h2 className="text-lg font-semibold flex-1">
        {monthName}{' '}
        <span className="text-muted-foreground text-sm font-medium">
          {year}
        </span>
      </h2>
      <div className="flex items-center gap-2">
        <CalendarButton {...prevButtonProps}>
          <ChevronLeftIcon className="h-4 w-4" />
        </CalendarButton>
        <CalendarButton {...nextButtonProps}>
          <ChevronRightIcon className="h-4 w-4" />
        </CalendarButton>
      </div>
    </div>
  );
}
