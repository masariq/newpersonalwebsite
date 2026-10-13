import { useEffect, useState } from 'react';

type ClockState = { wibTime: string; wibDate: string; visitorTime: string; difference: string };
const WIB_ZONE = 'Asia/Jakarta';
const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'short', day: '2-digit', month: 'short', timeZone: WIB_ZONE };

function zonedOffset(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone, year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric', hourCycle: 'h23',
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, Number(part.value)]));
  return Math.round((Date.UTC(values.year, values.month - 1, values.day, values.hour, values.minute, values.second) - date.getTime()) / 60000);
}

function differenceLabel(minutes: number) {
  if (Math.abs(minutes) < 1) return 'Same time as you';
  const amount = Math.abs(minutes);
  const hours = Math.floor(amount / 60);
  const mins = amount % 60;
  const amountText = [hours ? `${hours} ${hours === 1 ? 'hour' : 'hours'}` : '', mins ? `${mins} minutes` : ''].filter(Boolean).join(' and ');
  return `${amountText} ${minutes > 0 ? 'ahead of you' : 'behind you'}`;
}

function readClock(): ClockState {
  const now = new Date();
  const visitorZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return {
    wibTime: new Intl.DateTimeFormat('en-GB', { ...timeOptions, timeZone: WIB_ZONE }).format(now),
    wibDate: new Intl.DateTimeFormat('en-GB', dateOptions).format(now),
    visitorTime: new Intl.DateTimeFormat('en-GB', timeOptions).format(now),
    difference: differenceLabel(zonedOffset(now, WIB_ZONE) - zonedOffset(now, visitorZone)),
  };
}

export function WibClock({ variant = 'hero' }: { variant?: 'hero' | 'card' }) {
  const [clock, setClock] = useState<ClockState | null>(null);
  useEffect(() => {
    setClock(readClock());
    const timer = window.setInterval(() => setClock(readClock()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  if (variant === 'hero') {
    return (
      <div className="hero-clock" role="group" aria-label="Current time in Indonesia, WIB" data-testid="clock-hero">
        <span className="live-dot" aria-hidden="true" />
        {clock && <span className="clock-digits" aria-hidden="true">{clock.wibTime}</span>}
        <span>WIB · Indonesia (UTC+7)</span>
      </div>
    );
  }

  return (
    <section className="local-clock" aria-label="Local time information" data-testid="clock-contact">
      <h3>My local time</h3>
      <div className="local-clock-row" role="group" aria-label="Current time in Indonesia, WIB">
        <span>WIB · Indonesia</span>
        <span className="clock-digits" aria-hidden="true" data-testid="text-wib-time">{clock?.wibTime ?? '—:—:—'}</span>
      </div>
      <div className="clock-date" aria-hidden="true">{clock?.wibDate ?? ''}</div>
      <div className="local-clock-row">
        <span>Your local time</span>
        <span className="clock-digits" aria-hidden="true" data-testid="text-local-time">{clock?.visitorTime ?? '—:—:—'}</span>
      </div>
      <span className="timezone-diff" data-testid="text-time-difference">{clock?.difference ?? ''}</span>
    </section>
  );
}
