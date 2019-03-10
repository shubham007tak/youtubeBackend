const express = require('express');
const router = express.Router();
const ispController = require('../controllers/IspController');
const appConfig = require('../../config/appConfig')

const passport = require('passport');

let setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/isps`;


    // params: title, createdByEmail, createdBy, createdById,createdByEmail, createdForEmail, createdFor,fullNameCreatedFor,ispId,status,description,attachment
  app.post(`${baseUrl}/createIsp`, ispController.createIsp);
  /**
   * @apiGroup isp
   * @apiVersion 1.0.0
   * @api {post} /api/v1/isp/createIsp api to add isp
   * 
   * @apiParam {string} title Title of the isp (body param) (required)
   * @apiParam {string} createdBy Name of the Person who reported isp (body param) (required)
   * @apiParam {string} createdByEmail Email of the Person who Reported the isp (body param) (required)
   * @apiParam {string} createdById ID of the Person who created the isp (body param) (required)
   * @apiParam {string} createdFor ID of the Person to whom the isp is assigned (body param) (required)
   * @apiParam {string} createdForEmail Email of the Person to whom the isp is assigned (body param) (required)
   * @apiParam {string} fullNameCreatedFor Full name of the Person to whom the isp is assigned (body param) (required)
   * @apiParam {string} status status of the  isp (body param) (required)
   * @apiParam {string} description Description of the isp (body param) (required)
   * @apiParam {string} attachment File Name of the isp Screenshot (body param) (required)
   * @apiParam {string} authToken Authorization Token(body param/header/query param) of the Person who created isp (body param) (required)
   * 
   * @apiSuccess {object} myResponse shows error status, message, http status code, result.
   * 
   * @apiSuccessExample {object} Success-Response:
   * { 
     "error": false,
     "message": "isp created",
     "status": 200,
     "data": {
            "createdBy": "vaibhav tak"
            "createdByEmail": "vaibhav.tak@xyz.com"
            "createdById": "-zGtGVXTk"
            "createdFor": "3zclPt-r7"
            "createdForEmail": "aman.garg@xyz.com"
            "fullNameCreatedFor": "aman garg"
            "createdOn": "2019-02-12T18:45:45.000Z"
            "attachment": "1549719315834.user.png"
            "status": "backlog"
            "ispId": "jPOLNs4gd"
            "description": "isp in command"
            "title": "Isp1"
            "__v": 0
            "_id": "5c3f7bd9fdf17d172c3d9e47"
 
      } 
}
   */
    
    app.get(`${baseUrl}/view/all`, ispController.getAllIsps)
    /**
     * @apiGroup isps
     * @apiVersion 1.0.0
     * @api {get} /api/v1/isps/view/all api to get all isps
     * 
     * @apiParam {string} authToken authToken of the isp. (query params/body params/header)(required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * {
      "error": false,
      "message": "All Isp Details Found",
      "status": 200,
      "data": [
          {
            "ispId": "u-JSLXVEh",
            "firstName": "virat",
            "lastName": "rohit",
            "fullName": "virat rohit",
            "mobileNumber": 1234567890,
            "password": "$2a$10$I/mOPRhahQxxybdQIDFxLO0yNxLjg6hiVjjhnNRoRO6SwFspas4Ri",
            "createdOn": "2019-01-15T09:28:19.000Z",
            "ispName": "sharma",
            "email": "rohit.sharma@xyz.com",
            "countryName": "IN",
            "countryCode": 91
          },
          {
            "ispId": "MVJIQYRZK",
            "firstName": "anil",
            "lastName": "rana",
            "fullName": "anil rana"
            "mobileNumber": 1234567890,
            "password": "$2a$10$zItkcA5uAaO/SiAHe5hkLelizdlvLj/66AoVzx8XfiLRqWdSOvj5y",
            "createdOn": "2019-01-14T18:45:06.000Z",
            "ispName": "anil-admin",
            "email": "anil.rana@xyz.com",
            "countryName": "IN",
            "countryCode": 91
          }
      ]
  }
     */
    // params: ispId
    app.post(`${baseUrl}/:ispId/delete`, ispController.deleteIsp);
    /**
     * @apiGroup isps
     * @apiVersion 1.0.0
     * @api {get} /api/v1/isps/view/all api to delete a isp
     * 
     * @apiParam {string} authToken authToken of the isp. (query params/body params/header)(required)
     * @apiParam {string} ispId Isp Id of the isp (body params)(required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * {
      "error": false,
      "message": "Deleted the isp successfully",
      "status": 200,
      "data": [
          {
            "ispId": "u-JSLXVEh",
            "firstName": "virat",
            "lastName": "rohit", 
            "fullName": "virat rohit",   
            "mobileNumber": 1234567890,
            "password": "$2a$10$I/mOPRhahQxxybdQIDFxLO0yNxLjg6hiVjjhnNRoRO6SwFspas4Ri",
            "createdOn": "2019-01-15T09:28:19.000Z",
            "_id": "5c3da7b3cf9e321178b71f3d",
            "ispName": "sharma",
            "email": "rohit.sharma@xyz.com",
            "countryName": "IN",
           "countryCode": 91,
            "__v": 0
          }
      ]
  }
     */
    // params: ispId
    app.get(baseUrl +'/view/:ispId', ispController.getSingleIsp);

    /**
	 * @api {get} /api/v1/isps/view/:ispId Get a single isp
	 * @apiVersion 0.0.1
	 * @apiGroup isps
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} ispId The ispId should be passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Isp Details Found",
	    "status": 200,
	    "data": {
	    			"ispId": "MVJIQYRZK",
                    "firstName": "anil",
                    "lastName": "rana",
                    "fullName": "anil rana"
                    "mobileNumber": 1234567890,
                    "createdOn": "2019-01-14T18:45:06.000Z",
                    "ispName": "anil-admin",
                    "email": "anil.rana@xyz.com",
                    "countryName": "IN",    
                    "countryCode": 91
				}
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "No Isp Found",
	    "status": 404,
	    "data": null
	   }
	 */

    // params: ispId 
    app.put(baseUrl+'/:ispId/edit', ispController.editIsp);

    /**
	 * @api {put} /api/v1/isps/:ispId/edit Edit isp by ispId
	 * @apiVersion 0.0.1
	 * @apiGroup isps
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} ispId ispId of the isp passed as the URL parameter
     * @apiParam {Object} options parameters passed for editing
     *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
        "message": "Isp details edited",
        "status": 200,
        "data": {
                    "n": 1,
                    "nModified": 1,
                    "ok": 1 
                }
	    }
	  
	 */






}

module.exports = {
    setRouter: setRouter
}