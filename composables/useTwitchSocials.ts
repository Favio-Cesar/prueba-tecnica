import puppeteer from 'puppeteer'

export type SocialLinks = {
  twitter?: string
  youtube?: string
  discord?: string
  instagram?: string
  tiktok?: string
}

export async function fetchTwitchSocials(userName: string): Promise<SocialLinks> {
  const browser = await puppeteer.launch({ headless: 'new' }) // Nueva versión de headless para evitar problemas
  const page = await browser.newPage()

  try {
    await page.goto(`https://www.twitch.tv/${userName}`, { waitUntil: 'networkidle2' })

    // Extraer los enlaces de redes sociales
    const socials: SocialLinks = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a'))
      const socialLinks: SocialLinks = {}

      links.forEach((link) => {
        const href = link.getAttribute('href')
        if (!href) return

        if (href.includes('twitter.com')) socialLinks.twitter = href
        if (href.includes('youtube.com') || href.includes('youtu.be'))
          socialLinks.youtube = href
        if (href.includes('discord.gg') || href.includes('discord.com'))
          socialLinks.discord = href
        if (href.includes('instagram.com')) socialLinks.instagram = href
        if (href.includes('tiktok.com')) socialLinks.tiktok = href
      })

      return socialLinks
    })

    return socials
  } catch (error) {
    console.error('Error obteniendo redes sociales:', error)
    return {}
  } finally {
    await browser.close()
  }
}
