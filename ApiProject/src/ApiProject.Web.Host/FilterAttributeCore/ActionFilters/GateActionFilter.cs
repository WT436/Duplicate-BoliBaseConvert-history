﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;

namespace ApiProject.Web.Host.FilterAttributeCore.ActionFilters
{
    public class GateActionFilter : Attribute, IActionFilter
    {
        public void OnActionExecuted(ActionExecutedContext context)
        {
            var responsesResource = new ResponsesResource();
            try
            {
                context.ExceptionHandled = true;
                HttpResponse response = context.HttpContext.Response;
                response.ContentType = "application/json";

                if (context.Result == null && (context.Exception is Utils.Exceptions.ClientException ce))
                {
                    responsesResource.ErrorCode = ce.errorCode.ToString();
                    responsesResource.Error = true;
                    responsesResource.MessageError = context.Exception.Message;
                    responsesResource.Result = null;
                }
                else if (context.Result is ObjectResult objectResult)
                {
                    if (objectResult.StatusCode >= 400)
                    {
                        responsesResource.ErrorCode = objectResult.StatusCode.ToString();
                        responsesResource.Error = true;
                        responsesResource.MessageError = objectResult.Value;
                        responsesResource.Result = null;
                    }
                    else
                    {
                        responsesResource.Result = ((ObjectResult)context.Result).Value;
                    }
                }
                else if (context.Result == null && (context.Exception is Exception ex))
                {
                    responsesResource.ErrorCode = "500";
                    responsesResource.Error = true;
                    responsesResource.MessageError = context.Exception.Message;
                    responsesResource.Result = null;
                }
                context.Result = new ObjectResult(responsesResource);
                // Mã hóa gửi đi
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            // Giải mã nhận về
        }

        private class ResponsesResource
        {
            public bool Error { get; set; } = false;
            public string ErrorCode { get; set; }
            public object MessageError { get; set; }
            public object Result { get; set; }
        }
    }
}
