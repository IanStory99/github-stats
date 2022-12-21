## Github Stats

# Uso
    
    - Crear archivo ".env" tomando como base al de ejemplo .env.example
    - Los valores de las fechas son opcionales:
        - En caso de no especificar startDate -> se coge el último mes hasta endDate
        - En caso de no especificar endDate -> se coge el día de hoy
        - En caso de no especificar ninguno de los dos -> se cogen los datos del último mes a partir de hoy

    $ npm install
    $ npm run cli -- organization --name=<nombre> --startDate=<fecha inicio> --endDate=<fecha fin>