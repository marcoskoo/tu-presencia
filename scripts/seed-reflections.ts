import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

async function main() {
  const count = await db.reflection.count()
  if (count === 0) {
    await db.reflection.createMany({
      data: [
        {
          name: 'María',
          text: 'Llevaba meses viviendo en piloto automático. La práctica de la respiración consciente me devolvió al presente. Hoy siento que cada instante es una oportunidad para empezar de nuevo.',
        },
        {
          name: 'Andrés',
          text: 'El AQUÍ y el AHORA parecían obvios al leerlos, pero vivirlos lo cambia todo. Meditar diez minutos al día me enseñó que la calma no se busca afuera: se recuerda adentro.',
        },
        {
          name: 'Lucía',
          text: 'Empecé con la respiración cuadrada antes de dormir. Mi mente se aquieta como un lago al atardecer. Gratitud por este espacio de práctica compartida.',
        },
      ],
    })
    console.log('Reflexiones iniciales creadas')
  } else {
    console.log('Ya existen reflexiones, no se siembran datos')
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => db.$disconnect())
