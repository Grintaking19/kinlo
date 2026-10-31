   export type CreateUserPayloadData = {
    type: string;
    data: {
        username: string | null;
        email_addresses: Array<{
            email_address: string;
            id: string;
            verification: {
                status: string;
                strategy: string;
            };
        }>;
        first_name: string;
        last_name: string;
        id: string;
        image_url: string;
    }
}

export type DeleteUserPayloadData = {
    type: "user.deleted";
    data: {
        id: string;
        deleted: boolean;
    }
}


export type UpdateUserPayloadData = {
    type: "user.updated";
    data: {
        email_addresses: Array<{
            email_address: string;
            id: string;
            verification: {
                status: string;
                strategy: string;
            };
        }>;
        first_name: string;
        last_name: string;
        id: string;
        image_url: string;
        username: string | null;
        profile_image_url: string;
    }
}


