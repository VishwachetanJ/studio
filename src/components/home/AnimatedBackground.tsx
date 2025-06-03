
import { HandHeart } from 'lucide-react';
import React from 'react';

const iconsData = [
  { id: 1, top: '15%', left: '10%', size: 'w-16 h-16', bobDelay: 'delay-[0s]', pulseDelay: 'delay-[0.5s]', baseOpacityClass: 'opacity-5', bobDuration: 'duration-[7s]', pulseDuration: 'duration-[5s]' },
  { id: 2, top: '25%', left: '85%', size: 'w-24 h-24', bobDelay: 'delay-[1s]', pulseDelay: 'delay-[1.8s]', baseOpacityClass: 'opacity-[0.03]', bobDuration: 'duration-[8s]', pulseDuration: 'duration-[6s]' },
  { id: 3, top: '65%', left: '5%', size: 'w-20 h-20', bobDelay: 'delay-[0.7s]', pulseDelay: 'delay-[0.2s]', baseOpacityClass: 'opacity-[0.04]', bobDuration: 'duration-[6s]', pulseDuration: 'duration-[4s]' },
  { id: 4, top: '70%', left: '75%', size: 'w-28 h-28', bobDelay: 'delay-[0.3s]', pulseDelay: 'delay-[1.2s]', baseOpacityClass: 'opacity-[0.02]', bobDuration: 'duration-[9s]', pulseDuration: 'duration-[7s]' },
  { id: 5, top: '45%', left: '45%', size: 'w-12 h-12', bobDelay: 'delay-[1.2s]', pulseDelay: 'delay-[0.8s]', baseOpacityClass: 'opacity-[0.06]', bobDuration: 'duration-[5s]', pulseDuration: 'duration-[5s]' },
  { id: 6, top: '85%', left: '30%', size: 'w-14 h-14', bobDelay: 'delay-[0.2s]', pulseDelay: 'delay-[1s]', baseOpacityClass: 'opacity-[0.04]', bobDuration: 'duration-[7.5s]', pulseDuration: 'duration-[5.5s]' },
  { id: 7, top: '5%', left: '50%', size: 'w-10 h-10', bobDelay: 'delay-[1.5s]', pulseDelay: 'delay-[0.1s]', baseOpacityClass: 'opacity-[0.05]', bobDuration: 'duration-[6.5s]', pulseDuration: 'duration-[4.5s]' },
];

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {iconsData.map((icon) => (
        <HandHeart
          key={icon.id}
          className={`absolute text-primary ${icon.size} ${icon.baseOpacityClass} animate-logo-bob ${icon.bobDelay} ${icon.bobDuration} animate-logo-subtle-pulse ${icon.pulseDelay} ${icon.pulseDuration}`}
          style={{
            top: icon.top,
            left: icon.left,
          }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
