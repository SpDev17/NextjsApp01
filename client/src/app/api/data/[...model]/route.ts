import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { headers } from 'next/headers'
import apiController from '../../../database/mongodb/model/base.controller';
import mongooseConnect from '../../../database/mongodb/mongodb';

export async function GET(req: NextRequest, context: any) {
    try {


        //await Promise.all([
        //   mongooseConnect()
        // ]);

        const cookieStore = cookies();
        const headersList = headers();
        const token = cookieStore.get('token');

        const queryString = req.nextUrl.searchParams;
        const select = queryString.get('select');
        const filter = queryString.get('filter');
        const sort = queryString.get('sort');
        const desc = queryString.get('desc');

        console.log('---------------------------------------------------------------');
        //console.log(router);
        const { params } = context;
        //console.log(context);
        //http://:3000/api/data/user/get_json?select=id,title&$filter=go
        //console.log('---------------------------------------------------------------');
        //console.log(queryString);
        //console.log(select);
        //console.log('Model : ' + params['model'][0]);
        //console.log('Function : ' + params['model'][1]);
        //console.log('---------------------------------------------------------------');
//http://:3000/adminapi/member/get_json?desc=false&limit=10&lookup=%5B%7B%22model%22%3A%22group%22%2C%22select%22%3A%22title%22%2C%22path%22%3A%22groups%22%7D%5D&page=1&search=%22%22&select=%5B%22first_name%22%2C%22last_name%22%2C%22email%22%2C%22mobile%22%2C%22isactive%22%5D&sort=%22email%22
//http://:3000/adminapi/member/get_json?desc=false&limit=10&lookup=[{"model":"group","select":"title","path":"groups"}]&page=1&search=""&select=["first_name","last_name","email","mobile","isactive"]&sort="email"
        const model: string = params['model'][0];
        const operation: string = params['model'][1];
        let objReq: any = {};
        objReq['model'] = model;
        objReq['sort'] = sort;
        objReq['desc'] = desc;
        //console.log(select);
        //objReq['select'] = select;
        if (operation == 'get_json') {
            const data = await apiController.getJson(objReq);
            //console.log('====================Data is returned ================================');
            //console.log('data from server : ' + data);
            //console.log('====================It Ends ================================');
            return NextResponse.json(data);
        } else {
            return NextResponse.json({ "Model": model, "Function": operation, "queryString": queryString })
        }
    } catch (error) {
        return NextResponse.json({ error })
    }
}