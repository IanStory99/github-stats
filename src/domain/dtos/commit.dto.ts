interface PullRequestDTO {
    id: string;
    repositoryId: string;
    createdAt: string;
    updatedAt: string;
    mergedAt: string;
    merged: boolean;
}

export default PullRequestDTO;