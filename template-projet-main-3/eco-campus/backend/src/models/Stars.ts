export class Stars {
    id_metric : string;
    name : string;
    id_parent : string;
    category: string;
    description: string;

    constructor (id_metric : string, name : string, id_parent : string, description: string, category: string) {
        this.id_metric = id_metric;
        this.name=name;
        this.id_parent=id_parent;
        this.category=category;
        this.description=description;
    }
}