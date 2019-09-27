// import { generateJson } from "../../server/helpers/fileUtils";

/* Chart Related Interfaces */

interface DataPointValues {
    location: string;
    count: number;
    index: number;
}

type Package<T> = {
    [P in keyof T]: T[P];
};

type DataPoint = Package<DataPointValues>;

/* Data Categories  */

enum Category {
    FAMILIES = "Families",
    ACTIVE_AGING = "ActiveAging",
    PRESCHOOL = "Preschool",
    OTHERS = "Others"
}

const dataCategories = Object.values(Category);

export interface CategoryData {
    Families: DataPoint[];
    ActiveAging: DataPoint[];
    Preschool: DataPoint[];
    Others: DataPoint[];
}

type NumberVariant<T> = {
    [P in keyof T]: number;
};

type Keywords<T> = {
    [P in keyof T]: string[];
};

type CategoryIndexes = NumberVariant<CategoryData>;

const CategoryKeywords: Keywords<CategoryData> = {
    Families: ["families"],
    ActiveAging: ["aa", "activeageing", "activeaging"],
    Preschool: ["ecda", "preschool"],
    Others: []
};

/* Filter functions for chart data */

const getCategory = (name: string) => {
    if (name.includes("families")) {
        return Category.FAMILIES;
    } else if (
        name.includes("aa") ||
        name.includes("activeaging") ||
        name.includes("activeageing")
    ) {
        return Category.ACTIVE_AGING;
    } else if (name.includes("ecda")) {
        return Category.PRESCHOOL;
    }
    return Category.OTHERS;
};

export const removeCategoryFromName = (name: string, category: Category) => {
    let result = name;
    CategoryKeywords[category].forEach(word => {
        if (result.includes(word)) {
            result = result.replace(word, "");
        }
    });
    return result;
};

export const convertDataForBarChart = (stats: Object) => {
    const data: CategoryData = {
        Families: [],
        ActiveAging: [],
        Preschool: [],
        Others: []
    };
    const categoryIndexes: CategoryIndexes = {
        Families: 1,
        ActiveAging: 1,
        Preschool: 1,
        Others: 1
    };
    Object.keys(stats).map(locationName => {
        const count = stats[locationName];
        let location = locationName.toLowerCase();
        const category = getCategory(location);
        location = removeCategoryFromName(location, category);

        data[category].push({
            location,
            count,
            index: categoryIndexes[category]
        });
        categoryIndexes[category] += 1;
        // generateJson("filtered_data.json", data);
    });
    return data;
};
