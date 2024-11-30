import nodemailer from 'nodemailer';
import prisma from './prisma';

export const sendResultsToAllParticipants = async (roomId: string) => {
  const room = await prisma.room.findUnique({
    where: { roomId }
  })

  if (room) {
    const mostVotedTimes = await prisma.time.findMany({
      where: { roomId }, 
      include: { Vote: true },
      orderBy: { Vote: { _count: 'desc' } },
      take: 3,
    })

    const formatteResults = mostVotedTimes.map((time) => ({
      date: time.date.toISOString().split('T')[0],
      start: time.start.toISOString().split('T')[1],
      end: time.end.toISOString().split('T')[1],
      votes: time.Vote.length,
    }))

    let result = 'Aqui estão os 3 horários mais votados para a sala:\n\n'
    formatteResults.forEach((time, index) => {
      result += `${index + 1} - Data: ${time.date}\nInício: ${time.start}\nTérmino: ${time.end}\nQuantidade de Votos: ${time.votes}\n\n\n`;
    })

    if (room.emails.length != 0) {
      room.emails.forEach(async (email) => {
        console.log(email)
        await sendResultEmail(email, result)
      })
      console.log('E-mails enviados com sucesso!')
    }
  }
}

const sendResultEmail = async (email: string, result: string) => {
  const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  })

  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: email,
    subject: 'Resultado da votação',
    text: `A votação no Site do MeetSync foi encerrada! Aqui estão os melhores horários para a reunião: ${result}`,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('E-mail enviado com sucesso!')
  } catch (error) {
    console.error('Erro ao enviar o e-mail', error)
  }
}