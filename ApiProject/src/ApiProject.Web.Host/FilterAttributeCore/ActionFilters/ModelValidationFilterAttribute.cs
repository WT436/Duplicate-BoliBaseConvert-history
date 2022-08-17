using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace ApiProject.Web.Host.FilterAttributeCore.ActionFilters
{
    public class ModelValidationFilterAttribute : IActionFilter
    {
        public void OnActionExecuted(ActionExecutedContext context)
        {

        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            if (context.ModelState.ErrorCount > 0)
            {
                context.Result = new UnprocessableEntityObjectResult(context.ModelState);
                return;
            }
        }
    }
}
