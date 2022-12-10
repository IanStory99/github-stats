import { OrganizationEntity } from "@/domain/entities";
import { GitRepositoryInterface } from "@/domain/interfaces/repositories/GitRepository.interface";

export class GithubRepository implements GitRepositoryInterface {

    private serviceURI: string;
    private serviceToken: string;
    private request = require("axios");

    constructor() {
        this.serviceURI = process.env.GRAPHQL_GITHUB;
        this.serviceToken = process.env.GRAPHQL_TOKEN;
    }

    public async getOrganizationById(organizationId: string): Promise<OrganizationEntity> {
        
        const query = `
            query {
            organization(login: "${organizationId}") {
                id
                name
                }
        }`;
        try { 
            const { data, status } = await this.request(this.serviceURI, {
                method: "POST",
                data: JSON.stringify({ query }),
                headers: {
                Authorization: `Bearer ${this.serviceToken}`,
                },
            });

            if (status !== 200) {
                throw new Error('Something went wrong trying to access Github API');
            }

            return data;

        } catch(e) { 
            throw new Error(`Something went wrong trying to getDataByOrganization: ${e}`);
        }
    }
}