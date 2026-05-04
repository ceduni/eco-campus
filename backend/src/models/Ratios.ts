export class Ratios {
    id_ratios : string;
    name : string;
    metric1 : string;
    metric2: string;
    description: string;

    constructor (id_ratios : string, name : string, metric1 : string, metric2: string, description: string,) {
        this.id_ratios = id_ratios;
        this.name=name;
        this.metric1=metric1;
        this.metric2=metric2;
        this.description=description;
    }

                
        getid_ratios(): string {
            return this.id_ratios;
        }

        getname(): string {
            return this.name;
        }

        getmetric1(): string {
            return this.metric1;
        }

        getmetric2(): string {
            return this.metric2;
        }

        getdescription(): string {
            return this.description;
        }

        // Setters
        setid_ratios(value: string) {
            this.id_ratios = value;
        }

        setname(value: string) {
            this.name = value;
        }

        setmetric1(value: string) {
            this.metric1 = value;
        }

        setmetric2(value: string) {
            this.metric2 = value;
        }

        setdescription(value: string) {
            this.description = value;
        }
        
    }




