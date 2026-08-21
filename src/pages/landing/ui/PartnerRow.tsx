import { Icon } from '@iconify/react';
import { FadeIn } from '@/shared/ui/FadeIn';
import { useI18n } from '@/shared/i18n/I18nProvider';

const items = [
  {
    key: 'item1' as const,
    icon: 'solar:map-point-wave-bold-duotone',
  },
  {
    key: 'item2' as const,
    icon: 'solar:running-2-bold-duotone',
  },
  {
    key: 'item3' as const,
    icon: 'solar:user-heart-rounded-bold-duotone',
  },
  {
    key: 'item4' as const,
    icon: 'solar:case-round-bold-duotone',
  },
];

export function PartnerRow() {
  const { t } = useI18n();

  return (
    <div>
      <FadeIn>
        <h2 className="mb-10 font-serif text-3xl font-semibold text-[#7ec8cd] sm:mb-12 sm:text-4xl">
          {t.partners.title}
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
        {items.map((item, index) => (
          <FadeIn key={item.key} delay={index * 0.08}>
            <article className="group flex h-full min-h-[220px] flex-col items-start gap-5 rounded-3xl border border-brand-line bg-brand-card p-6 transition duration-300 hover:border-brand-mint/40 hover:bg-[#1f1f1f] sm:min-h-[260px] sm:p-7">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-teal/15 text-brand-mint sm:h-20 sm:w-20">
                <Icon
                  icon={item.icon}
                  className="h-10 w-10 sm:h-12 sm:w-12"
                  aria-hidden="true"
                />
              </div>
              <p className="text-base font-medium leading-snug text-white sm:text-lg">
                {t.partners[item.key]}
              </p>
            </article>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
