import { useState, useContext, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { utmContext, utmNames, type UTM } from '@/providers/UTM';

const useUTM = ({
    utm_source,
    utm_medium,
    utm_campaign,
    source_name,
    source_widget,
    campaignid,
    campaignname,
    cta_page,
    cta_widget,
    adgroupid,
    gad_source,
    matchtype,
    device,
    keyword
}: UTM) => {
    //* Priorities: 1-Current Client url queries , 2-local args of UseUTM , 3-global context utms
    const [utms, setUTMs] = useState({});
    const { utms: globalUTMS } = useContext(utmContext);
    const searchParams = useSearchParams();
    const updateUTMs = useCallback(() => {
        const finalUtmSourceQuery = searchParams.get('utm_source') || utm_source || globalUTMS.utm_source;
        const finalUtmMediumQuery = searchParams.get('utm_medium') || utm_medium || globalUTMS.utm_medium;
        const finalUtmCtaPageQuery = searchParams.get('cta_page') || cta_page || globalUTMS.cta_page;
        const finalUtmCtaWidgetQuery = searchParams.get('cta_widget') || cta_widget || globalUTMS.cta_widget;
        const finalUtmCampaignQuery = searchParams.get('utm_campaign') || utm_campaign || globalUTMS.utm_campaign;
        const finalSourceNameQuery = searchParams.get('source_name') || source_name || globalUTMS.source_name;
        const finalSourceWidgetQuery = searchParams.get('source_widget') || source_widget || globalUTMS.source_widget;
        const finalCampaignIdQuery = searchParams.get('campaignid') || campaignid || globalUTMS.campaignid;
        const finalCampaignNameQuery = searchParams.get('campaignname') || campaignname || globalUTMS.campaignname;
        const finalAdgroupIdQuery = searchParams.get('adgroupid') || adgroupid || globalUTMS.adgroupid;
        const finalGadSourceQuery = searchParams.get('gad_source') || gad_source || globalUTMS.gad_source;
        const finalMatchTypeQuery = searchParams.get('matchtype') || matchtype || globalUTMS.matchtype;
        const finalDeviceQuery = searchParams.get('device') || device || globalUTMS.device;
        const finalKeywordQuery = searchParams.get('keyword') || keyword || globalUTMS.keyword;
        const restQueries: any = {};
        for (const [key, value] of searchParams.entries()) {
            if (!utmNames.includes(key)) restQueries[key] = value;
        }
        setUTMs({
            ...(!!finalUtmSourceQuery && { utm_source: finalUtmSourceQuery }),
            ...(!!finalUtmMediumQuery && { utm_medium: finalUtmMediumQuery }),
            ...(!!finalUtmCtaPageQuery && { cta_page: finalUtmCtaPageQuery }),
            ...(!!finalUtmCtaWidgetQuery && { cta_widget: finalUtmCtaWidgetQuery }),
            ...(!!finalUtmCampaignQuery && { utm_campaign: finalUtmCampaignQuery }),
            ...(!!finalSourceNameQuery && { source_name: finalSourceNameQuery }),
            ...(!!finalSourceWidgetQuery && { source_widget: finalSourceWidgetQuery }),
            ...(!!finalCampaignIdQuery && { campaignid: finalCampaignIdQuery }),
            ...(!!finalCampaignNameQuery && { campaignname: finalCampaignNameQuery }),
            ...(!!finalAdgroupIdQuery && { adgroupid: finalAdgroupIdQuery }),
            ...(!!finalGadSourceQuery && { gad_source: finalGadSourceQuery }),
            ...(!!finalMatchTypeQuery && { matchtype: finalMatchTypeQuery }),
            ...(!!finalDeviceQuery && { device: finalDeviceQuery }),
            ...(!!finalKeywordQuery && { keyword: finalKeywordQuery }),
            ...restQueries
        });
    }, [
        searchParams,
        //utm_source
        utm_source,
        globalUTMS.utm_source,
        //utm_medium
        utm_medium,
        globalUTMS.utm_medium,
        //cta_page
        cta_page,
        globalUTMS.cta_page,
        //cta_widget
        cta_widget,
        globalUTMS.cta_widget,
        //utm_campaign
        utm_campaign,
        globalUTMS.utm_campaign,
        //source_name
        source_name,
        globalUTMS.source_name,
        //source_widget
        source_widget,
        globalUTMS.source_widget,
        //campaignid
        campaignid,
        globalUTMS.campaignid,
        //campaignname
        campaignname,
        globalUTMS.campaignname,
        //adgroupid
        adgroupid,
        globalUTMS.adgroupid,
        //gad_source
        gad_source,
        globalUTMS.gad_source,
        //matchtype
        matchtype,
        globalUTMS.matchtype,
        //device
        device,
        globalUTMS.device,
        //keyword
        keyword,
        globalUTMS.keyword
    ]);

    useEffect(() => {
        updateUTMs();
    }, [updateUTMs]);

    return utms;
};

export default useUTM;

//? Example:
// const pathname = usePathname()
// const utm = useUTM({
//     source_name: pathname==='/'?'main':pathname
//     source_widget: 'widget'
// });
// <Link href={{
//         pathname: 'https://dashboard.cufinder.io/auth/signup',
//         query: {...utm}
//     }}
// >
// click me
// </Link>
