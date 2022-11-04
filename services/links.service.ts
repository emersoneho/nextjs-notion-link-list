import { getDatabase, getBlocks, getPage } from "../lib/notion";

type Link = {
    id: string,
    title: string,
    link: string,
    tags: any,
    order: number,
    type: string,
}
const databaseId: any = process.env.NOTION_DATABASE_LINKS;

const formatData = (data: any) => {
    let finalData: any = {};

    data.map((work: any) => {
        const id = work.id;
        const properties = work.properties;
        const type = properties.Select.select.name || 'link'
        let auxData: Link = {
            id: id,
            title: properties.Title.title[0].plain_text,
            tags: [],
            link: properties.Link.url,
            order: properties.Order.number || 9999,
            type: type,
        };
        finalData[type] ||= [];
        finalData[type].push(auxData);
    })

    //    finalData.sort((a: any, b: any) => (a.order > b.order) ? 1 : -1)

    return finalData;
}

const getAllData = async () => {
    const response = await getDatabase(databaseId);
    const formatted = formatData(response.results);
    return formatted;
}

const getData = async (id: string) => {
    const responsePage = await getPage(id);
    const formattedWorkPage = formatData([responsePage]);

    const responseBlocks = await getBlocks(id);

    const finalData = {
        page: formattedWorkPage.works[0]
    }
    return finalData;
}

export { getAllData, getData }