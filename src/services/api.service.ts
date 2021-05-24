import env from "react-dotenv";

export class ApiServices {
    async getShippingMethods() {
        const apiUrl = `${env.API_URL}/api/melonn/getshm`;
        const response = await window.fetch(apiUrl, {
            method: 'GET',
        }).then((resp) => {
            return resp.json();
        }).then((json) => {
            return json;
        });
        return response;
    }
    async createOrder(input: any) {
        const apiUrl = `${env.API_URL}/api/order/create`;
        const parsedVariables = JSON.stringify(input);
        const response = await window.fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: parsedVariables
        }).then((resp) => {
            return resp.json();
        }).then((json) => {
            return json;
        });
        return response;
    }
    async getOrders() {
        const apiUrl = `${env.API_URL}/api/order/get`;
        const response = await window.fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then((resp) => {
            return resp.json();
        }).then((json) => {
            return json;
        });
        return response;
    }
}
