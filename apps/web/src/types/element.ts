import React from 'react'
import { BaseLayout } from 'components/layouts/BaseLayout'

export namespace ElementExtendTypes {
    export type PageLayout<PageProps> = React.FC<PageProps> & { getLayout: typeof BaseLayout; requireAuth?: boolean }
}
