import MemberDTO from "./member.dto";

type MemberCollectionDTO = MemberDTO[]; 

interface TeamDTO {
    id: string;
    name: string;
    createdAt: string;
    members: MemberCollectionDTO;
}

export default TeamDTO;