"""Style the lab's frozen timelines; no outcome extraction or recomputation.

Sources: run 006 analysis/chapter/{quest,levelup}_timeline.csv, provided in
LAB_ANSWERS_2026-09-11.md §7. Stop hours are supplied there, not inferred.
Run with MPLCONFIGDIR=/private/tmp/kamibench-matplotlib python3 scripts/plot-006-quests.py
"""
import csv
from pathlib import Path
import xml.etree.ElementTree as ET
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

root = Path(__file__).resolve().parents[1]
data = root / 'blog/figures/data'
quests = list(csv.DictReader((data / '006-quest-timeline.csv').open()))
levels = list(csv.DictReader((data / '006-levelup-timeline.csv').open()))
stops = {'sonnet5-control': 189.6, 'sonnet5-pushed': 186.5, 'gpt52-control': 147.1, 'gpt52-pushed': 146.2}
plt.rcParams.update({'font.family': 'DejaVu Sans', 'font.size': 10, 'svg.fonttype': 'none', 'svg.hashsalt': 'kamibench-006', 'axes.spines.top': False, 'axes.spines.right': False})
fig, axes = plt.subplots(1, 2, figsize=(10, 5.6))
fig.subplots_adjust(left=.075, right=.97, top=.77, bottom=.31, wspace=.27)
fig.patch.set_facecolor('#faf9f7')
fig.text(.075,.95,'Knowledge delivery, run 006',fontsize=15,weight='bold',color='#1c1917')
fig.text(.075,.9,'EXPLORATORY · one arm per condition',fontsize=10,color='#6d675f')
fig.text(.075,.85,'Dashed: control     Solid: pushed knowledge',fontsize=10,color='#6d675f')

for ax, model, name, color in zip(axes,['sonnet5','gpt52'],['Sonnet 5','gpt-5.2'],['#2a78d6','#008300']):
    ax.set_facecolor('#faf9f7')
    ax.set_title(name,loc='left',fontsize=13,weight='bold',pad=12,color='#1c1917')
    ax.set_xlim(0,215); ax.set_ylim(0,25)
    ax.set_xticks([0,48,96,144,192]); ax.set_yticks([0,5,10,15,20])
    ax.grid(axis='y',color='#e5e1da',linewidth=.7)
    ax.set_axisbelow(True)
    for spine in ax.spines.values(): spine.set_color('#e5e1da')
    ax.tick_params(colors='#6d675f',length=0,pad=6,labelsize=10)
    ax.set_xlabel('Hours since each arm started',color='#6d675f',labelpad=8)
    ax.set_ylabel('Quests completed',color='#6d675f',labelpad=7)
    for condition, style in [('control','--'),('pushed','-')]:
        arm=f'006-{model}-{condition}-r1'
        rows=[r for r in quests if r['arm']==arm]
        x=[float(r['hours']) for r in rows];y=[int(r['cum_quests']) for r in rows]
        x.append(stops[f'{model}-{condition}']);y.append(y[-1])
        ax.step(x,y,where='post',linestyle=style,color=color,linewidth=1.8)
        ax.plot(x[-1],y[-1],marker='o',markersize=4,color=color)
        ax.annotate(str(y[-1]),(x[-1],y[-1]),xytext=(5,0),textcoords='offset points',va='center',fontsize=11,color=color,weight='bold')
        if condition=='control' and model=='sonnet5':
            for row in levels:
                h=float(row['hours']);q=max(int(r['cum_quests']) for r in rows if float(r['hours'])<=h)
                ax.plot(h,q,marker='^',markersize=7,color=color,markeredgecolor='#faf9f7',markeredgewidth=.6)
            ax.annotate('First level-up',xy=(float(levels[0]['hours']),max(int(r['cum_quests']) for r in rows if float(r['hours'])<=float(levels[0]['hours']))),xytext=(17,22.7),fontsize=10,color='#1c1917',arrowprops={'arrowstyle':'-','color':'#6d675f','lw':.7})

# Separate event strip expands the six overlapping markers; uses the six frozen
# timestamps and the interval explicitly verified in the lab answer.
strip=fig.add_axes([.075,.065,.395,.08]);strip.axis('off')
strip.text(0,1,'Session 70: six level-ups in 37 seconds',transform=strip.transAxes,fontsize=10,color='#1c1917')
seconds=[0,10,16,23,31,37]
strip.set_xlim(-1,38);strip.set_ylim(-1,1)
strip.plot([0,37],[0,0],color='#e5e1da',linewidth=1)
strip.plot(seconds,[0]*6,'^',color='#2a78d6',markersize=6)
strip.text(0,-.8,'04:41:26 UTC',ha='left',fontsize=9,color='#6d675f')
strip.text(37,-.8,'04:42:03 UTC',ha='right',fontsize=9,color='#6d675f')
fig.text(.075,.015,'Lines end at operator stops. ▲ Landed level-up.',fontsize=9,color='#6d675f')
dst=root/'blog/figures/006-quests-over-time.svg'
fig.savefig(dst,metadata={'Date':None,'Description':'Frozen run 006 quest timelines and eight level-up events. Both pushed arms completed more quests; only Sonnet control leveled. See the run page for stop boundaries and limitations.'})
preview=Path('/private/tmp/kamibench-editorial-2026-09-11/006-quests-over-time.png')
preview.parent.mkdir(parents=True,exist_ok=True)
fig.savefig(preview,dpi=160)

# Make the matplotlib output follow the existing site's theme conventions while
# preserving fallback colors for GitHub and other standalone SVG renderers.
ns='http://www.w3.org/2000/svg'; ET.register_namespace('',ns)
tree=ET.parse(dst);svg=tree.getroot();svg.set('class','qf-chart');svg.set('role','img')
svg.set('aria-labelledby','qf-title')
title=ET.Element(f'{{{ns}}}title',{'id':'qf-title'})
title.text='Run 006: quest progress within each model. Sonnet control 19, pushed 22; gpt-5.2 control 11, pushed 19. All eight landed level-ups belong to the Sonnet control. Exploratory, one arm per condition.'
svg.insert(0,title)
palette={'#faf9f7':'var(--bg, #faf9f7)','#1c1917':'var(--text, #1c1917)','#6d675f':'var(--muted, #6d675f)','#e5e1da':'var(--line, #e5e1da)','#2a78d6':'var(--plot-blue, #2a78d6)','#008300':'var(--plot-green, #008300)'}
for element in svg.iter():
    # Inline HTML recognizes SVG href, but not ElementTree's generated ns4:href.
    # Keep every endpoint and level-up marker visible when the SVG is embedded.
    link=element.attrib.pop('{http://www.w3.org/1999/xlink}href',None)
    if link is not None: element.set('href',link)
    if 'style' in element.attrib:
        style=element.attrib['style']
        style=style.replace("font-family: 'DejaVu Sans'", "font-family: system-ui, -apple-system, 'Segoe UI', sans-serif")
        for color,value in palette.items(): style=style.replace(color,value)
        element.set('style',style)
tree.write(dst,encoding='unicode')
print(dst)
