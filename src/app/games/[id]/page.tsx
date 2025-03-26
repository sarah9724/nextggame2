'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import CommentSection from '../../components/CommentSection'
import RatingSystem from '../../components/RatingSystem'
import GameEmbed from '../../components/GameEmbed'
import AppLayout from '../../components/AppLayout'

// 模拟游戏数据
const gamesData = [
  {
    id: 1,
    title: '开心消消乐',
    category: '休闲',
    rating: 4.8,
    image: '/placeholder.jpg',
    description: '经典三消游戏，简单易上手',
    longDescription: '开心消消乐是一款经典的三消类游戏，玩家需要通过交换相邻的图标来消除三个或更多相同的图标。游戏设计简单易上手，但是随着关卡的推进，难度会逐渐增加，给玩家带来持续的挑战和乐趣。',
    features: ['1000+关卡', '精美的图形设计', '简单易上手', '持续更新'],
    url: 'https://example.com/game1',
    iframeUrl: 'https://www.addictinggames.com/embed/html5-games/20543'
  },
  {
    id: 2,
    title: '模拟人生',
    category: '模拟',
    rating: 4.6,
    image: '/placeholder.jpg',
    description: '创建和经营你的虚拟生活',
    longDescription: '模拟人生让玩家可以创建和控制虚拟人物，体验虚拟世界中的生活。你可以建造房屋、发展事业、建立关系，享受无限的创造可能。游戏提供丰富的自定义选项，让每个玩家都能打造独特的游戏体验。',
    features: ['角色自定义', '建造系统', '社交系统', '职业发展'],
    url: 'https://example.com/game2',
    iframeUrl: 'https://www.gameflare.com/embed/mini-mall-millionaire/'
  },
  {
    id: 3,
    title: '动物之森',
    category: '模拟',
    rating: 4.9,
    image: '/placeholder.jpg',
    description: '在温馨的小岛上展开新生活',
    longDescription: '在动物之森中，玩家可以在一个充满可爱动物居民的小岛上开始新的生活。你可以装饰自己的家，收集各种物品，与邻居互动，享受悠闲的岛屿生活。游戏随着现实时间变化，每天都有新的惊喜等待发现。',
    features: ['实时游戏系统', '收集元素', '社区互动', '岛屿装饰'],
    url: 'https://example.com/game3',
    iframeUrl: 'https://wanted5games.com/games/html5/cute-pet-rescue-new-en-s-iga-cloud/index.html?pub=10'
  },
  {
    id: 5,
    title: '国际象棋',
    category: '益智',
    rating: 4.7,
    image: '/placeholder.jpg',
    description: '经典的国际象棋游戏，锻炼战略思维',
    longDescription: '国际象棋是一种古老而经典的棋盘游戏，需要玩家运用战略思维和战术技巧。游戏具有深厚的历史底蕴和丰富的策略变化，既适合初学者入门，也能满足专业棋手的需求。本游戏提供了友好的界面和智能的电脑对手，让你随时随地享受下棋乐趣。',
    features: ['智能AI对手', '多种难度级别', '棋步提示', '记录游戏历史'],
    url: 'https://playpager.com/chess/',
    iframeUrl: 'https://playpager.com/embed/chess/index.html'
  },
  {
    id: 7,
    title: '花园物语',
    category: '模拟',
    rating: 4.7,
    image: '/placeholder.jpg',
    description: '经营自己的花园，种植各种植物',
    longDescription: '花园物语是一款轻松愉快的模拟经营游戏，玩家可以设计和经营自己的梦想花园。从种植各种花卉和蔬果，到装饰花园空间，玩家可以充分发挥创意，打造出独具特色的绿色天地。游戏还有季节变化系统，每个季节都有不同的植物可种植。',
    features: ['多样植物选择', '季节变化系统', '花园装饰元素', '成就系统'],
    url: 'https://example.com/game7',
    iframeUrl: 'https://www.gameflare.com/embed/garden-bloom/'
  },
  {
    id: 8,
    title: '魔法学院',
    category: '角色扮演',
    rating: 4.4,
    image: '/placeholder.jpg',
    description: '成为魔法学院的学生，学习魔法',
    longDescription: '魔法学院是一款奇幻风格的角色扮演游戏，玩家将扮演一名新入学的魔法学徒，在充满神秘的魔法学院学习各种魔法技能。游戏中，玩家需要参加魔法课程，完成各种任务，结交朋友或对抗敌人，逐渐成长为一名强大的魔法师。',
    features: ['多样的魔法系统', '校园剧情', '人物关系系统', '魔法对战'],
    url: 'https://example.com/game8',
    iframeUrl: 'https://www.gameflare.com/embed/magic-fishing/'
  },
  {
    id: 9,
    title: '星际探险',
    category: '冒险',
    rating: 4.6,
    image: '/placeholder.jpg',
    description: '探索未知的星球，完成各种任务',
    longDescription: '星际探险是一款科幻冒险游戏，玩家将扮演一名星际探险家，驾驶飞船探索未知的星球和星系。在探索过程中，玩家需要收集资源，应对各种挑战，解开星际文明的秘密。游戏画面精美，故事情节丰富，给玩家带来沉浸式的科幻冒险体验。',
    features: ['开放世界探索', '资源收集系统', '飞船升级', '星际地图'],
    url: 'https://example.com/game9',
    iframeUrl: 'https://www.gameflare.com/embed/space-shooter-galaxy-attack/'
  },
  {
    id: 10,
    title: '王国守卫',
    category: '策略',
    rating: 4.2,
    image: '/placeholder.jpg',
    description: '建立防御系统，保护王国免受入侵',
    longDescription: '王国守卫是一款塔防策略游戏，玩家需要在地图上建造各种防御塔，阻止敌人入侵王国。游戏提供多种不同功能的防御塔和敌人类型，玩家需要根据敌人的特点选择合适的防御策略。随着关卡的推进，挑战难度会逐渐增加，考验玩家的策略思维。',
    features: ['多样的防御塔', '丰富的敌人类型', '升级系统', '特殊技能'],
    url: 'https://example.com/game10',
    iframeUrl: 'https://www.gameflare.com/embed/kingdom-defense/'
  },
  {
    id: 11,
    title: '黑白棋',
    category: '益智',
    rating: 4.0,
    image: '/placeholder.jpg',
    description: '经典的黑白棋(奥赛罗)游戏，简单规则蕴含无限变化',
    longDescription: '黑白棋，也被称为奥赛罗或反转棋，是一种在8×8方格棋盘上进行的两人对战策略游戏。规则简单易学：放下一枚棋子后，夹在新棋子和已有同色棋子之间的所有对手棋子都会翻转成你的颜色。游戏目标是在棋盘填满时拥有最多棋子。虽然规则简单，但黑白棋的策略却非常深奥，需要前瞻性思维和战略计划。',
    features: ['智能AI对手', '经典棋盘设计', '战略提示', '不同难度级别'],
    url: 'https://playpager.com/reversi/',
    iframeUrl: 'https://playpager.com/embed/reversi/index.html'
  },
  {
    id: 12,
    title: '餐厅大亨',
    category: '模拟',
    rating: 4.5,
    image: '/placeholder.jpg',
    description: '经营自己的餐厅，招待顾客',
    longDescription: '餐厅大亨是一款模拟经营游戏，玩家将扮演餐厅老板，从一家小餐馆开始，逐步发展成为餐饮帝国。游戏中，玩家需要管理菜单、雇佣员工、装修餐厅、提升服务质量等，以吸引更多顾客并获得更高评价。游戏还有季节性活动和特殊顾客，增添了游戏的变化性。',
    features: ['餐厅装修系统', '菜单管理', '员工雇佣与培训', '顾客满意度系统'],
    url: 'https://example.com/game12',
    iframeUrl: 'https://www.gameflare.com/embed/happy-chef/'
  },
  {
    id: 18,
    title: '跳棋',
    category: '益智',
    rating: 4.2,
    image: '/placeholder.jpg',
    description: '经典的跳棋游戏，与电脑对战锻炼战略思维',
    longDescription: '跳棋是一种古老而经典的棋盘游戏，两位玩家各控制一组棋子，通过移动和吃子争取获胜。这款跳棋游戏提供了友好的用户界面和智能的AI对手，玩家可以选择不同的难度级别进行挑战。游戏规则遵循国际跳棋规则，棋子只能斜向前进，通过跳过对方棋子来吃子。当一方无法移动或所有棋子被吃光时，游戏结束。游戏特别适合那些喜欢策略思考和预判对手行动的玩家。',
    features: ['多级AI难度', '国际跳棋规则', '走法提示', '悔棋功能', '游戏记录回放'],
    url: 'https://playpager.com/checkers/',
    iframeUrl: 'https://playpager.com/embed/checkers/index.html'
  },
  {
    id: 20,
    title: '美妆达人',
    category: '模拟',
    rating: 4.3,
    image: '/placeholder.jpg',
    description: '体验化妆和时尚造型的乐趣',
    longDescription: '美妆达人让玩家化身为时尚彩妆师，体验化妆和造型的乐趣。游戏提供多种人物模型和丰富的化妆品选择，包括口红、眼影、腮红等，玩家可以自由搭配创造各种妆容。游戏还有时装搭配系统，可以为模特选择服装、发型和配饰，打造完整的时尚造型。',
    features: ['丰富的化妆品选择', '多样的妆容风格', '服装搭配系统', '造型分享功能'],
    url: 'https://example.com/game20',
    iframeUrl: 'https://www.gameflare.com/embed/fashion-designer/'
  },
  {
    id: 21,
    title: '城市建造者',
    category: '模拟',
    rating: 4.4,
    image: '/placeholder.jpg',
    description: '设计和建造自己的梦想城市',
    longDescription: '城市建造者是一款城市模拟经营游戏，玩家将从一片空地开始，规划道路、建设各类建筑，逐步发展成为一座繁荣的都市。游戏中需要平衡居民的住房、工作、娱乐等需求，管理城市资源，应对各种挑战如交通拥堵、环境污染等问题。随着城市发展，可以解锁更多高级建筑和设施。',
    features: ['自由的城市规划', '多种建筑类型', '经济系统', '城市事件'],
    url: 'https://example.com/game21',
    iframeUrl: 'https://www.gameflare.com/embed/city-builder-3d/'
  },
  {
    id: 22,
    title: '小花仙',
    category: '角色扮演',
    rating: 4.5,
    image: '/placeholder.jpg',
    description: '在花仙子世界中收集花朵，培养精灵',
    longDescription: '小花仙是一款精美可爱的养成类角色扮演游戏，玩家将扮演一位花仙子，在充满魔法的世界中探险。游戏主要围绕收集各种花朵、培养花精灵、装扮角色等活动展开。玩家可以在游戏中结交朋友，参加各种季节性活动，共同保护花之王国的和平。',
    features: ['花朵收集系统', '精灵培养', '角色装扮', '社交互动'],
    url: 'https://example.com/game22',
    iframeUrl: 'https://www.gameflare.com/embed/flower-garden-dress-up/'
  },
  {
    id: 23,
    title: '恋与制作人',
    category: '角色扮演',
    rating: 4.7,
    image: '/placeholder.jpg',
    description: '在虚拟世界中体验恋爱剧情',
    longDescription: '恋与制作人是一款浪漫的恋爱模拟游戏，玩家将扮演一位电视节目制作人，在事业发展的同时，与四位各具特色的男主角展开情感互动。游戏结合了视觉小说、卡牌收集和角色培养等元素，剧情丰富感人，配音精良。玩家的选择将影响剧情走向和角色关系发展。',
    features: ['沉浸式恋爱剧情', '语音配音', '多结局系统', '卡牌收集'],
    url: 'https://example.com/game23',
    iframeUrl: 'https://www.gameflare.com/embed/college-love-story/'
  },
  {
    id: 24,
    title: '小小医师',
    category: '角色扮演',
    rating: 4.2,
    image: '/placeholder.jpg',
    description: '扮演医院院长角色，管理医院，治疗患者',
    longDescription: '小小医师是一款医院经营和角色扮演游戏，玩家将扮演医院院长，负责管理整个医院的运营。游戏内容包括诊断患者、安排治疗、升级设备、管理医护人员等。随着游戏进行，玩家可以不断提升医疗技能，解锁更多治疗方法，建设一家声誉卓著的医院。',
    features: ['医院管理系统', '多种疾病诊断', '医疗技能升级', '医护人员管理'],
    url: 'https://example.com/game24',
    iframeUrl: 'https://www.gameflare.com/embed/dr-panda/'
  },
  {
    id: 25,
    title: '2048',
    category: '益智',
    rating: 4.8,
    image: '/placeholder.jpg',
    description: '经典的数字合并游戏，简单上手但极具挑战性',
    longDescription: '2048是一款简单而富有挑战性的数字益智游戏。玩家通过上下左右滑动，使相同的数字方块相撞并合并，目标是创建一个值为2048的方块。每次移动后，会有一个新的2或4出现在棋盘上。随着数字的增长，棋盘空间越来越小，游戏难度不断提高，考验玩家的策略思维和规划能力。虽然规则简单，但要达到2048甚至更高的数字需要相当的技巧和耐心。',
    features: ['简洁直观的界面', '渐进式难度', '高分记录系统', '无限挑战模式'],
    url: 'https://play2048.co/',
    iframeUrl: 'https://play2048.co/'
  },
  {
    id: 26,
    title: '怪物生存者',
    category: '冒险',
    rating: 4.9,
    image: '/placeholder.jpg',
    description: '在充满怪物的世界中生存并变得更强',
    longDescription: '怪物生存者是一款刺激的生存冒险游戏，玩家将在一个充满各种怪物的世界中求生存。游戏采用了roguelike元素，每次游戏都会有不同的体验。玩家需要收集装备，升级能力，击败各种怪物并尽可能长时间地生存下去。游戏节奏紧张，画面精美，拥有丰富的怪物种类和武器系统，给玩家带来紧张刺激的游戏体验。',
    features: ['多样化的怪物类型', '丰富的武器和装备', '随机生成的地图', '技能升级系统', '高难度挑战'],
    url: 'https://example.com/monster-survivors',
    iframeUrl: 'https://wanted5games.com/games/html5/monster-survivors-new-en-s-iga-cloud/index.html?pub=10'
  }
]

export default function GamePage() {
  const params = useParams()
  const gameId = Number(params.id)
  const game = gamesData.find(g => g.id === gameId)

  if (!game) {
    return (
      <AppLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">游戏未找到</h1>
            <p className="text-gray-600 mb-8">抱歉，您查找的游戏不存在或已被移除</p>
            <a href="/" className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
              返回首页
            </a>
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 游戏标题区 */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-purple-800 mb-2">{game.title}</h1>
          <div className="inline-block px-4 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">
            {game.category}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* 游戏iframe嵌入 */}
          <div className="mb-6">
            <GameEmbed 
              gameUrl={game.iframeUrl} 
              title={game.title} 
              height={550}
            />
          </div>

          {/* 游戏描述和信息 */}
          <div className="p-8">
            <div className="prose max-w-none">
              <p className="text-gray-600 text-lg leading-relaxed">{game.longDescription}</p>
            </div>
            
            {/* 评分系统 */}
            <div className="mt-8 p-4 bg-purple-50 rounded-lg">
              <RatingSystem gameId={gameId} initialRating={game.rating} />
            </div>
            
            {/* 游戏特点 */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-purple-700 mb-4">游戏特点</h2>
              <div className="grid grid-cols-2 gap-4">
                {game.features.map((feature, index) => (
                  <div key={index} className="flex items-center bg-purple-50 p-3 rounded-lg">
                    <span className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center text-purple-800 mr-3">
                      ✦
                    </span>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 社区互动区 */}
          <div className="border-t border-gray-100 p-8 bg-gradient-to-b from-white to-purple-50">
            <div className="max-w-4xl mx-auto">
              {/* 评论区域标题 */}
              <div className="flex items-center mb-6">
                <div className="h-10 w-1 bg-purple-500 rounded-full mr-4"></div>
                <h2 className="text-2xl font-bold text-purple-800">玩家评论</h2>
              </div>
              
              {/* 评论组件 */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <CommentSection gameId={gameId} />
              </div>
            </div>
          </div>
        </div>
        
        {/* 相关推荐 */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-purple-800 mb-6">猜你喜欢</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {gamesData.filter(g => g.id !== gameId).slice(0, 4).map(relatedGame => (
              <a 
                href={`/games/${relatedGame.id}`}
                key={relatedGame.id} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="h-40 bg-gradient-to-r from-pink-100 to-purple-100 flex items-center justify-center group-hover:from-pink-200 group-hover:to-purple-200 transition-all">
                  <div className="text-5xl opacity-70">🎮</div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-purple-800 group-hover:text-purple-600 transition-colors">{relatedGame.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{relatedGame.category}</p>
                  <div className="mt-2 flex items-center">
                    <span className="text-yellow-400">{'★'.repeat(Math.floor(relatedGame.rating))}</span>
                    <span className="text-gray-300">{'☆'.repeat(5-Math.floor(relatedGame.rating))}</span>
                    <span className="text-sm text-gray-500 ml-2">{relatedGame.rating}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
} 