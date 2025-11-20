import React from 'react'
import { YouTubeVideo } from '../App.jsx'

// --- START: Localization Data for YouTube Page ---
const locales = {
  'en': {
    title: 'YouTube — Restricted & Supervised',
    lead: 'Restricted Mode, supervised experiences (Kids / supervised account), comments & watch history controls.',
    sections: {
      privacy: {
        h2: 'Privacy & Safety', pill1: 'Restricted Mode', pill2: 'Watch/Search history',
        steps: [
          'Profile Picture (Top Right) → <b>Settings</b> → <b>General</b> → Enable <b>Restricted Mode</b> (Must be enabled on each device).',
          '<b>History</b> → Pause watch/search history, or clear regularly to reduce personalized recommendations.',
          'Channel level: Turn off "Subscription visibility", hide liked videos (YouTube Studio → Settings).',
        ]
      },
      screenTime: {
        h2: 'Screen Time & Wellbeing', pill1: 'Remind me to take a break', pill2: 'Bedtime reminder',
        steps: [
          'Settings → <b>General</b> → Turn on <b>Remind me to take a break</b>, <b>Bedtime reminder</b>.',
          'Mobile can also track watch time: Profile → <b>Your data in YouTube</b> / <b>Time watched</b>.',
        ]
      },
      copyright: {
        h2: 'Copyright & Digital Literacy', pill1: 'Fair Use', pill2: 'Misinformation',
        steps: [
          '<b>Copyright Basics</b>: Do not upload content (music, movie clips, images) unless you created it or have permission. YouTube automatically scans for copyright infringement.',
          '<b>Understanding Fair Use</b>: Using small portions of copyrighted material for purposes like critique, commentary, news reporting, teaching, or parody may be protected by Fair Use.',
          '<b>Spotting Misinformation</b>: Check the source, look for multiple credible news reports, and be wary of highly emotional or sensationalized video titles and thumbnails.',
        ]
      },
      supervised: {
        h2: 'Supervised Experiences', pill1: 'YouTube Kids', pill2: 'Supervised Account',
        steps: [
          'Young children: Install <b>YouTube Kids</b>, parents set content level and watch time.',
          'School-age/Teens: Create a <b>Supervised Account</b> via Google Family Link, select content level (Explore / Explore More / Most of YouTube), control search and duration.',
        ]
      }
    },
    ytTitles: {
      parental: 'How to Set Up YouTube Parental Controls (Restricted Mode & Family Link)',
      copyright: 'All you want to know about FAIR USE!',
    }
  },
  'zh-CN': {
    title: 'YouTube — 受限与监督体验',
    lead: '受限模式、监督体验（Kids / 监督账户）、评论和观看历史记录控制。',
    sections: {
      privacy: {
        h2: '隐私与安全', pill1: '受限模式', pill2: '观看/搜索历史记录',
        steps: [
          '右上角头像 → <b>设置</b> → <b>通用</b> → 开启 <b>受限模式</b>（每台设备都要开启）。',
          '<b>历史记录</b> → 暂停观看/搜索历史，或定期清除，减少个性化推荐。',
          '频道层面：关闭“订阅可见性”、隐藏喜欢的视频（YouTube Studio → 设置）。',
        ]
      },
      screenTime: {
        h2: '屏幕时间与健康', pill1: '提醒我休息一下', pill2: '就寝提醒',
        steps: [
          '设置 → <b>通用</b> → 打开 <b>提醒我休息一下</b>、<b>就寝提醒</b>。',
          '移动端还能统计观看时间：个人资料 → <b>您在 YouTube 中的数据</b> / <b>观看时间</b>。',
        ]
      },
      copyright: {
        h2: '版权与数字素养', pill1: '合理使用', pill2: '错误信息',
        steps: [
          '<b>版权基础</b>：除非您是创作者或拥有许可，否则请勿上传内容（音乐、电影片段、图像）。YouTube 会自动扫描版权侵权。',
          '<b>理解合理使用</b>：出于评论、批评、新闻报道、教学或模仿等目的使用少量版权材料可能受到合理使用的保护。',
          '<b>识别错误信息</b>：检查来源，查找多个可靠的新闻报道，并警惕高度情绪化或耸人听闻的视频标题和缩略图。',
        ]
      },
      supervised: {
        h2: '监督体验', pill1: 'YouTube Kids', pill2: '监督账户',
        steps: [
          '年幼儿童：安装 <b>YouTube Kids</b>，家长设置内容等级与观看时间。',
          '学龄/青少年：通过 Google Family Link 创建 <b>监督账户</b>，选择内容级别（探索 / 探索更多 / 大部分 YouTube），控制搜索与时长。',
        ]
      }
    },
    ytTitles: {
      parental: 'YouTube 家长控制设置（受限模式和家庭关联）',
      copyright: '版权合理使用完全指南',
    }
  }
};
// --- END: Localization Data for YouTube Page ---

export default function YouTube({ lang }){
  const t = locales[lang];
  const s = t.sections;
  return (
    <div className="doc youtube">
      <h1>{t.title}</h1>
      <p className="lead">{t.lead}</p>

      <div className="section">
        <h2>{s.privacy.h2}</h2>
        <span className="pill">{s.privacy.pill1}</span>
        <span className="pill">{s.privacy.pill2}</span>
        <ol className="steps">
          <li>{s.privacy.steps[0]}</li>
          <li>{s.privacy.steps[1]}</li>
          <li>{s.privacy.steps[2]}</li>
        </ol>
      </div>

      <div className="section">
        <h2>{s.screenTime.h2}</h2>
        <span className="pill">{s.screenTime.pill1}</span>
        <span className="pill">{s.screenTime.pill2}</span>
        <ol className="steps">
          <li>{s.screenTime.steps[0]}</li>
          <li>{s.screenTime.steps[1]}</li>
        </ol>
      </div>

      <div className="section">
        <h2>{s.copyright.h2}</h2>
        <span className="pill">{s.copyright.pill1}</span>
        <span className="pill">{s.copyright.pill2}</span>
        <ol className="steps">
          <li>{s.copyright.steps[0]}</li>
          <li>{s.copyright.steps[1]}</li>
          <li>{s.copyright.steps[2]}</li>
        </ol>
      </div>

      <div className="section">
        <h2>{s.supervised.h2}</h2>
        <span className="pill">{s.supervised.pill1}</span>
        <span className="pill">{s.supervised.pill2}</span>
        <ol className="steps">
          <li>{s.supervised.steps[0]}</li>
          <li>{s.supervised.steps[1]}</li>
        </ol>
      </div>

      <YouTubeVideo videoId="QwlVSphX4Bg" title={t.ytTitles.parental} lang={lang} />
      <YouTubeVideo videoId="1l_woDlHq30" title={t.ytTitles.copyright} lang={lang} />
    </div>
  )
}