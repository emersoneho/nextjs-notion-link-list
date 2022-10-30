import { getDatabase, getBlocks, getPage } from "../lib/notion";

type Works = {
    id: string,
    title: string,
    image: string,
    link: string,
    tags: any,
    category: any,
    description: any,
    order: number,
}
const databaseId: any = process.env.NOTION_DATABASE_PRODUCTS;

const formatProducts = (products: any) => {
    let finalData: any = [];

    products.map((work: any) => {
        const id = work.id;
        const properties = work.properties;

        let auxData: Works = {
            id: id,
            title: properties.Name.title[0].plain_text,
            tags: [],
            image: properties.Image.rich_text[0].text.content,
            link: properties.Link.url,
            description: properties.Description.rich_text[0].text.content,
            category: properties.Category.select.name,
            order: properties.Order.number || 9999,
        };

        finalData.push(auxData);
    })

    finalData.sort((a: any, b: any) => (a.order > b.order) ? 1 : -1)

    return finalData;
}

const getProducts = async () => {
    const response = await getDatabase(databaseId);
    const formatted = formatProducts(response.results);
    return formatted;
}

const getProduct = async (id: string) => {
    const responsePage = await getPage(id);
    const formattedWorkPage = formatProducts([responsePage]);

    const responseBlocks = await getBlocks(id);

    const finalData = {
        page: formattedWorkPage.works[0]
    }
    return finalData;
}

export { getProducts, getProduct }