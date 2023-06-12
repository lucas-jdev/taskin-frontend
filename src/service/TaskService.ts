import { Status } from "@/models/Task";

export const deleteTask = (id: string) => {
    fetch(`https://taskin-backend-production.up.railway.app/api/task/${id}`, {
        method: 'DELETE'
    }).catch((error) => {
        console.error('Error:', error);
    });
};

export const archiveTask = (id: string) => {
    fetch(`https://taskin-backend-production.up.railway.app/api/task/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            status: Status.ARCHIVED
        }),
    }).catch((error) => {
        console.error('Error:', error);
    });
};