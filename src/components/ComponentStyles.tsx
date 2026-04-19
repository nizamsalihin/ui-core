'use client';

import { components } from '@/data/components';

export default function ComponentStyles() {
  const allCss = components
    .flatMap((c) => c.variants.map((v) => v.css))
    .join('\n');

  return <style dangerouslySetInnerHTML={{ __html: allCss }} />;
}
