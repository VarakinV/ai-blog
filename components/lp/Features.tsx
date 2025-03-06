import { CloudRain } from 'lucide-react';

const features = [
  {
    name: 'Sign up for free',
    description: 'Sign up for free and start scheduling meetings in minutes.',
    icon: CloudRain,
  },
  {
    name: 'Blazing fast',
    description: 'With Booking App, scheduling meetings has never been easier.',
    icon: CloudRain,
  },
  {
    name: 'Sequre with Nylas',
    description: 'Nylas is a cloud-based email and calendar service.',
    icon: CloudRain,
  },
  {
    name: 'Simple to use',
    description: 'Simple to use, easy to navigate and fast to schedule.',
    icon: CloudRain,
  },
];
export function Features() {
  return (
    <div className="py-24">
      <div className="max-w-2xl mx-auto lg:text-center">
        <p className="font-semibold text-primary leading-7">
          Schedule faster and more efficiently
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Schedule meetings in minutes!
        </h2>
        <p className="mt-6 text-base leading-snug text-muted-foreground">
          With Booking App, scheduling meetings has never been easier.
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <div className="grid max-w-xl gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-16">
              <div className="text-base font-medium leading-7">
                <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-primary">
                  <feature.icon className="size-6 text-white" />
                </div>
                {feature.name}
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-snug">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
