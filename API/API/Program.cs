using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();
builder.Services.AddCors( // Configurando o Cors
    options => options.AddPolicy("Acesso Total",
     configs => configs
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod())
);
var app = builder.Build();


app.MapGet("/", () => "Prova A1");

//ENDPOINTS DE CATEGORIA
//GET: http://localhost:5273/api/categoria/listar
app.MapGet("/api/categoria/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Categorias.Any())
    {
        return Results.Ok(ctx.Categorias.ToList());
    }
    return Results.NotFound("Nenhuma categoria encontrada");
});

//POST: http://localhost:5273/api/categoria/cadastrar
app.MapPost("/api/categoria/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Categoria categoria) =>
{
    ctx.Categorias.Add(categoria);
    ctx.SaveChanges();
    return Results.Created("/api/categoria/listar", categoria);
});

//ENDPOINTS DE TAREFA
//GET: http://localhost:5273/api/tarefas/listar
app.MapGet("/api/tarefas/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Tarefas.Any())
    {
        return Results.Ok(ctx.Tarefas.Include(x => x.Categoria).ToList());
    }
    return Results.NotFound("Nenhuma tarefa encontrada");
});

//POST: http://localhost:5273/api/tarefas/cadastrar
app.MapPost("/api/tarefas/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Tarefa tarefa) =>
{
    Categoria? categoria = ctx.Categorias.Find(tarefa.CategoriaId);
    if (categoria == null)
    {
        return Results.NotFound("Categoria não encontrada");
    }
    tarefa.Categoria = categoria;
    ctx.Tarefas.Add(tarefa);
    ctx.SaveChanges();
    return Results.Created("/api/tarefas/listar", tarefa);
});

//PUT: http://localhost:5273/tarefas/alterar/{id}
app.MapPut("/api/tarefas/alterar/{id}", ([FromServices] AppDataContext ctx, [FromRoute] string id) =>
{
    Tarefa? tarefa = ctx.Tarefas.Find(id);
    if (tarefa is null)
    {
        return Results.NotFound("Tarefa não encontrada");
    }
    if (tarefa.Status == "Não iniciada")
    {
        tarefa.Status = "Em andamento";
    }
    else if (tarefa.Status == "Em andamento")
    {
        tarefa.Status = "Concluida";
    }

    ctx.Tarefas.Update(tarefa);
    ctx.SaveChanges();
    return Results.Ok(ctx.Tarefas.ToList());
});

// Mude o nome do endpoint para "excluir" no backend
app.MapDelete("/api/tarefas/excluir/{id}", ([FromRoute] int id, [FromServices] AppDataContext ctx) =>
{
    Tarefa? tarefa = ctx.Tarefas.Find(id);

    if (tarefa is null)
    {
        return Results.NotFound();
    }

    ctx.Tarefas.Remove(tarefa);
    ctx.SaveChanges();
    return Results.Ok(tarefa);
});


//GET: http://localhost:5273/tarefas/naoconcluidas
app.MapGet("/api/tarefas/naoconcluidas", ([FromServices] AppDataContext ctx) =>
{
    return Results.Ok(ctx.Tarefas.Where(x => x.Status != "Concluida").ToList());
});

//GET: http://localhost:5273/tarefas/concluidas
app.MapGet("/api/tarefas/concluidas", ([FromServices] AppDataContext ctx) =>
{
    return Results.Ok(ctx.Tarefas.Where(x => x.Status == "Concluida").ToList());
});

app.UseCors("Acesso Total"); // Dar acesso ao cors
app.Run();