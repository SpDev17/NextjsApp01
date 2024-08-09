import { userDTO } from "../DTO/userDTO";
import { NextRequest, NextResponse } from 'next/server';
import Cryprto from 'crypto-js';
const { Secrets_session } = require('../../../shared/envconfig');
import jwt from 'jsonwebtoken';
import { httpLogger } from '../../../(services)/(logger)/logger';
const apiController = () => {
    var GetModelObject = function (param: string) {
        var obj = null;
        if (param === "permission") {
            obj = require('../schema/permission.schema');
        } else if (param === "grouppermission") {
            obj = require('../schema/grouppermission.schema');
        }
        else if (param === "group") {
            obj = require('../schema/group.schema');
        }
        else if (param === "user") {
            obj = require('../schema/user.schema');
        }
        else if (param === "restaurants") {
            obj = require('../schema/restaurants.schema');
        }
        return obj;
    };
    var parseQueryString = function (param: any, defaultValue: any) {
        if (param != "" && param != "undefined" && param != null && param.length > 0) {
            return JSON.parse(param);
        } else {
            return defaultValue;
        }
    };
    var GetResponseDTO = function (param: string) {
        var obj: any = null;
        if (param === "permission") {
            obj = require('../DTO/permissionDTO');
            obj = obj['permissionDTO'];
        } else if (param === "grouppermission") {
            obj = require('../DTO/groupPermissionDTO');
            obj = obj['groupPermissionDTO'];
        }
        else if (param === "group") {
            obj = require('../DTO/groupDTO');
            obj = obj['groupDTO'];
        }
        else if (param === "user") {
            obj = require('../DTO/userDTO');
            obj = obj['userDTO'];
        }
        else if (param === "restaurants") {
            obj = require('../DTO/restaurantDTO');
            obj = obj['restaurantDTO'];
        }
        return obj;
    };

    const login = async (objRequest: any) => {
        const objModel = GetModelObject('user');
        //let str: any = Cryprto.AES.encrypt(objRequest.password, Secrets_session).toString();
        //console.log('Plain pass ' + objRequest.password + ', Encrypt str : ' + str);
        //str = Cryprto.AES.decrypt(str, Secrets_session);

        //var originalText = str.toString(Cryprto.enc.Utf8);

        //console.log('d : ' + originalText);
        //var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
        const objDTO = GetResponseDTO('user');
        const res: any = await objModel.default.fn_ValidateUser(objRequest, function () { });
        console.log('res : ' + res);
        let token: any = '';
        if (res != null) {
            const dto = objDTO?.toResponse(res);
            //https://www.npmjs.com/package/jsonwebtoken
            token = jwt.sign({ email: res.email, first_name: res.first_name }, Secrets_session, { expiresIn: '1h' });
            return { "status": 200, "user": res, "token": token };
        } else {
            return { "status": 201 };
        }

    }

    const getJson1 = async (objRequest: any) => {
        let objData: any = {};
        const model = objRequest['model'];
        console.log('==================================================');
        const objModel = GetModelObject(model);
        const objDTO = GetResponseDTO(model);
        let id: string = objRequest['id'];

        let selectJson: any = parseQueryString(objRequest['select'], {});
        let lookup: any = parseQueryString(objRequest['lookup'], {});
        if (id != null && id != undefined) {
            objData['id'] = id;
            objData['select'] = selectJson;
            objData['lookup'] = lookup;
            objModel.default.fn_ReadById(objData).then(function (item: any) {
                const usersDTO = objDTO?.toResponse(item);
                //res.send(usersDTO);
                return usersDTO;
            }, function (err: any) {
                //res.status(422).json(err);
                return err;
            });
        }
        else {
            let perPage: Number = parseQueryString(objRequest['limit'], 10);
            let page: Number = parseQueryString(objRequest['page'], 1);

            let sortParam: string = parseQueryString(objRequest['sort'], "title");
            let sortOrder: any = parseQueryString(objRequest['desc'], false);
            sortOrder = sortOrder == true ? -1 : 1;
            let sortJson: any = {};
            sortJson[sortParam] = sortOrder;
            let searchParam: string = parseQueryString(objRequest['search'], "");
            let searchkeypassed: boolean = parseQueryString(objRequest['searchkeypassed'], false);
            var searchJson: any = {};
            if (
                searchParam != undefined &&
                searchParam != "" &&
                searchParam != '""'
            ) {
                if (searchkeypassed) {
                    searchJson = Object.assign({}, searchParam);
                } else {
                    searchJson[sortParam] = {
                        $regex: searchParam,
                        $options: "i"
                    };
                }
            } else {
                searchJson = {};
            }


            var lookupArray = [];
            if (model == 'user') {
                lookupArray.push({
                    path: "groups",
                    model: "group",
                    select: "title",
                    populate: {
                        path: "grouppermission",
                        model: "permission",
                        select: "title"
                    }
                });
            }
            objData['select'] = selectJson;
            objData['search'] = searchJson;
            objData['sort'] = sortJson;
            objData['limit'] = perPage;
            objData['page'] = page;
            objData['lookup'] = lookupArray;//lookup;

            await objModel.default.fn_Read(objData).then(function (items: any) {
                const usersDTO = items.map((item: any) => objDTO?.toResponse(item));
                console.log('====================Data is returned ================================');
                return { 'data': usersDTO, 'status': 200, 'error': '' };
                //return NextResponse.json(usersDTO);
            }, function (err: any) {
                //return err;
                console.log('-----------------------Error------------------------');
                console.log(err);
                //return NextResponse.json(err);
                return { 'data': {}, 'status': 402, 'error': err };
            });
        }

    }
    const getJson = async (objRequest: any) => {
        httpLogger.info(objRequest);
        //?desc=false&limit=10&lookup=[{"model":"group","select":"title","path":"groups"}]&page=1&search=""&select=["first_name","last_name","email","mobile","isactive"]&sort="email"
        //console.log('env '+process.env.Host);
        let objData: any = {};
        const model = objRequest['model'];
        const objModel = GetModelObject(model);
        const objDTO = GetResponseDTO(model);
        let id: string = objRequest['id'];
        let selectJson: any = parseQueryString(objRequest['select'], {});
        let lookup: any = parseQueryString(objRequest['lookup'], {});
        if (id != null && id != undefined) {
            return { "Status": "200", "id": "1" };
        }
        else {
            let perPage: Number = parseQueryString(objRequest['limit'], 10);
            let page: Number = parseQueryString(objRequest['page'], 1);

            let sortParam: string = parseQueryString(objRequest['sort'], "title");
            let sortOrder: any = parseQueryString(objRequest['desc'], false);
            sortOrder = sortOrder == true ? -1 : 1;
            let sortJson: any = {};
            sortJson[sortParam] = sortOrder;
            //console.log('sortJson : ' + JSON.stringify(sortJson));
            let searchParam: string = parseQueryString(objRequest['search'], "");
            let searchkeypassed: boolean = parseQueryString(objRequest['searchkeypassed'], false);
            var searchJson: any = {};
            if (searchParam != undefined && searchParam != "" && searchParam != '""') {
                if (searchkeypassed) {
                    searchJson = Object.assign({}, searchParam);
                } else {
                    searchJson[sortParam] = {
                        $regex: searchParam,
                        $options: "i"
                    };
                }
            } else {
                searchJson = {};
            }


            var lookupArray = [];
            if (model == 'user') {
                lookupArray.push({
                    path: "groups",
                    model: "group",
                    select: "title",
                    populate: {
                        path: "grouppermission",
                        model: "permission",
                        select: "title"
                    }
                });
            }
            objData['select'] = selectJson;
            objData['search'] = searchJson;
            objData['sort'] = sortJson;
            objData['limit'] = perPage;
            objData['page'] = page;
            objData['lookup'] = lookupArray;//lookup;
            let data: any = await objModel.default.fn_Read(objData);
            if (data) {
                let datacount: any = await objModel.default.fn_GetCount(searchJson);
                const dto = data.map((item: any) => objDTO?.toResponse(item));
                return { "Status": "200", "data": dto, "error": {}, "total": datacount };
            } else {
                return { "Status": "402", "data": {}, "error": { "error": "true" }, "total": 0 };
            }
        }
    }
    return {

        getJson,
        getJson1,
        login


    };
}
export default apiController();