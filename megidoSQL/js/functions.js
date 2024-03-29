(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.functions = factory();
    }
}(this, function () {
    function initialize() {
        var query = ("CREATE TABLE megido_basic "+
            "(megido_name STRING, megido_number STRING, style STRING, klass STRING, gage INTEGER, "
            +"race STRING, gender STRING, megido_intro STRING, me_intro STRING, CV STRING, link STRING)");
        alasql(query);
        alasql.tables.megido_basic.data = database.megido_basic;
        
        var query = ("CREATE TABLE megido_status "+
            "(megido_name STRING, category STRING, evolution INTEGER, data INTEGER)");
        alasql(query);
        alasql.tables.megido_status.data = database.megido_status;
        
        var query = ("CREATE TABLE megido_skill "+
            "(megido_name STRING, category STRING, skill_name STRING, description STRING)");
        alasql(query);
        alasql.tables.megido_skill.data = database.megido_skill;
        
        var query = ("CREATE TABLE orb_basic "+
            "(orb_name STRING, style STRING, rarity STRING, race STRING, CT STRING, link STRING)");
        alasql(query);
        alasql.tables.orb_basic.data = database.orb_basic;
        
        var query = ("CREATE TABLE orb_skill "+
            "(orb_name STRING, category STRING, skill_name STRING, description STRING)");
        alasql(query);
        alasql.tables.orb_skill.data = database.orb_skill;
        
        var query = ("CREATE TABLE mass_effect "+
            "(megido_name STRING, position INTEGER, style STRING, klass STRING, gender STRING, description STRING)");
        alasql(query);
        alasql.tables.mass_effect.data = database.mass_effect;
        
        var query = ("CREATE TABLE treasure "+
            "(treasure_name STRING, rush INTEGER, counter INTEGER, burst INTEGER, size INTEGER, effect STRING, "+
            "health INTEGER, attack INTEGER, defence INTEGER, dexterity INTEGER)");
        alasql(query);
        alasql.tables.treasure.data = database.treasure;
        
        var query = ("CREATE VIEW megido AS "+
            "SELECT megido_name AS name, style, klass, gage, category, "+
            "('<strong>'+skill_name+'</strong><br/>'+description) AS description, link "+
            "FROM (SELECT * FROM megido_basic NATURAL INNER JOIN megido_skill) "+
            "WHERE category LIKE '%特性' or category LIKE '＋%' or category = '秘奥義'");
        alasql(query);

        var query = ("CREATE VIEW orb AS "+
            "SELECT orb_name AS name, style, rarity, CT, category, "+
            "('<strong>'+skill_name+'</strong><br/>'+description) AS description, link "+
            "FROM (SELECT * FROM orb_basic NATURAL INNER JOIN orb_skill) "+
            "WHERE category LIKE '特性%' or category LIKE '技%'");
        alasql(query);

        var query = ("CREATE VIEW megido_orb AS "+
            "SELECT style, '' as rarity, klass, name, gage, '' as ct, category, description, link FROM megido "+
            "UNION SELECT style, rarity, '' as klass, name, '' as gage, CT, category, description, link FROM orb");
        alasql(query);
            
        try {
            var data = JSON.parse(decodeURIComponent(window.location.hash.substring(1)));
            var query = document.getElementById("query");
            if ("query" in data) {
                query.value = data["query"];
            }
        } catch (e) {
        }
    }
    function search() {
        clear_table();

        var query = document.getElementById("query");
        var res = alasql(query.value);

        var thead = document.getElementById("thead");
        if (res.length > 0) {
            var tr = document.createElement("tr");
            var entry = res[0];
            for (var key in entry) {
                if (key in database.header) {
                    key = database.header[key];
                }
                tr.innerHTML += "<th>" + key + "</th>";
            }
            thead.appendChild(tr);
        }

        var tbody = document.getElementById("tbody");
        for (var i in res) {
            var tr = document.createElement("tr");
            for (var j in res[i]) {
                tr.innerHTML += "<td>" + res[i][j] + "</td>";
            }
            tbody.appendChild(tr);
        }

        var data = { "query": query.value };
        window.location.hash = '#' + encodeURIComponent(JSON.stringify(data));
    }
    function clear_table() {
        var thead = document.getElementById("thead");
        thead.innerHTML = "";

        var tbody = document.getElementById("tbody");
        tbody.innerHTML = "";

        window.location.hash = "";
    }
    function initialize_shortcut() {
        var param = [
            "攻撃力",
            "防御力",
            "素早さ",
        ];
        var buffer = [
            ["ダメージ軽減", "(?:ダメージ軽減|(?<!(?:アタック|スキル)フォトンからの)ダメージを\\\\d+%軽減)"],
            ["自然回復", "(?:自然回復|ターン終了時に?、?HPが\\\\d+%回復|ターン終了時、HPを\\\\d+%回復)"],
            ["カウンター", "反撃する状態"],
            ["状態変化耐性", "状態異常と弱体を無効化する状態"],
            ["かばう", "単体攻撃を受け持"],
            ["フォトン容量上昇", "(?:積めるフォトンの量|フォトン容量)を\\\\+\\\\d+する"],
            ["アタック強化", "(?:全フォトン|全てのフォトン|アタック(?:とスキル|とチャージ)?)を強化"],
            ["スキル強化", "(?:全フォトン|全てのフォトン|スキル(?:とアタック|とチャージ)?)を強化"],
            ["チャージ強化", "(?:全フォトン|全てのフォトン|チャージ(?:とアタック|とスキル)?)を強化"],
            ["回数バリア", "攻撃を\\\\d+回無効化"],
            ["ダメージブロック", "最大HPの\\\\d+%以下のダメージを無効化"],
            ["アタックバリア", "アタックフォトンからのダメージを\\\\d+%軽減"],
            ["スキルバリア", "スキルフォトンからのダメージを\\\\d+%軽減"],
            ["列化", "効果範囲を列化"],
            ["全体化", "効果範囲を全体化"],
            ["固定追加ダメージ", "Lv×\\\\d+の固定追加ダメージを付与"],
            ["無敵", "無敵状態に"],
            ["追撃", "味方のアタックに対して自身が追撃する状態"],
            ["魅了", "魅了状態"],
            ["加勢", "加勢状態"],
            ["火ダメージ上昇", "(?<!受ける)火ダメージを\\\\d+%上昇"],
            ["雷ダメージ上昇", "(?<!受ける)雷ダメージを\\\\d+%上昇"],
            ["リザーブ", "リザーブ状態"],
            ["状態異常命中上昇", "状態異常命中率を\\\\d+%上昇"],
            ["範囲かばう", "(?:範囲攻撃を受け持|範囲かばう)"],
            ["全域かばう", "全域かばう"],
            ["根性", "(?:踏みとどまる|踏み止まる)"],
            ["自動蘇生", "(?:自動蘇生|戦闘不能時にHP\\\\d+%で蘇生する状態)"],
            ["回避", "回避状態\\\\(\\\\d+%\\\\)"],
            ["遊撃", "遊撃状態"],
            ["猛攻", "猛攻状態"],
            ["一気呵成", "一気呵成状態"],
            ["支援", "支援状態"],
            ["覚醒増加量上昇", "覚醒増加量を\\\\+\\\\d"],
        ];
        var debuffer = [
            ["フォトン容量低下", "(?:積めるフォトンの量|フォトン容量)を-\\\\d+する"],
            ["火耐性低下", "受ける火ダメージを\\\\d+%上昇"],
            ["雷耐性低下", "受ける雷ダメージを\\\\d+%上昇"],
            ["アタック劣化", "(?:全フォトン|全てのフォトン|アタックフォトン(?:とスキル|とチャージ)?)を劣化"],
            ["スキル劣化", "(?:全フォトン|全てのフォトン|スキルフォトン(?:とアタック|とチャージ)?)を劣化"],
            ["チャージ劣化", "(?:全フォトン|全てのフォトン|チャージフォトン(?:とアタック|とスキル)?)を劣化"],
            ["覚醒増加量低下", "覚醒増加量を-\\\\d"],
        ];
        var bad_status = [
            "毒",
            "めまい",
            "感電",
            "呪い",
            "暗闇",
            "睡眠",
            "凍結",
            "混乱",
            "束縛",
            "病気",
            "ノックバック",
            "引き寄せ",
            "煉獄の炎",
            "ねずみ化",
            "ゾンビ",
            "悪夢",
            "完殺",
            "即死",
            "執心",
        ];
        var field = [
            "炎上",
            "滞水",
            "突風",
            "地割れ",
            "氷結",
            "帯電",
            "浸食",
            "夢幻",
        ];
        var protection = [
            "海魔の加護",
            "万雷の加護",
            "勇輝の加護",
        ];
        var exfield = [
            "狂炎地形",
            "凍土地形",
        ];
        var extra = [
            ["バーサーク", "バーサーク状態"],
            ["点穴", "点穴を\\\\+\\\\d"],
            ["固定砲台", "固定砲台状態"],
            ["点穴結集", "得られる点穴の値が\\\\d+度だけ2倍"],
            ["ライブ", "\\\\d+ターンの間ライブ"],
            ["ハイドロボム速", "(?:Hボム|ハイドロボム)速"],
            ["ハイドロボム重", "(?:Hボム|ハイドロボム)重"],
            ["ハイドロボム錬", "(?:Hボム|ハイドロボム)錬"],
            ["エレキ", "エレキ状態"],
            ["励起", "励起状態"],
            ["封印", "封印状態"],
            ["回数チェイン", "回数チェイン\\\\d+回"],
            ["アーマー", "アーマーを\\\\d+付与"],
            ["エール", "エールを付与"],
            ["回数防御貫通", "防御無視\\\\d+回を付与"],
            ["遅延行動", "\\\\d+ターン後、"],
            ["巨大化", "(?<!ぬいぐるみ)巨大化状態"],
            ["ぬいぐるみ巨大化", "ぬいぐるみ巨大化状態"],
            ["ブレイク待機", "ブレイク状態"],
            ["ブレイク技", "【(?:アタック|スキル|チャージ|特殊)ブレイク(?:】|：)"],
            ["攻撃力昇華", "攻撃力昇華状態"],
            ["レイズギフト", "レイズギフト(?:\\\\(\\\\d+\\\\))?効果"],
            ["デスギフト", "デスギフト(?:\\\\(\\\\d+\\\\))?効果"],
            ["虚弱", "虚弱状態"],
            ["導", "導を付与"],
            ["暴奏", "暴奏状態"],
            ["覚醒コスト減少", "覚醒ゲージの最大値を-\\\\d+"],
            ["荷電", "荷電状態"],
            ["焼夷砲火", "焼夷砲火状態"],
            ["オーバーヒート", "オーバーヒート状態"],
            ["剛剣", "剛剣状態"],
            ["おねだり", "おねだり状態"],
            ["おかえし", "おかえし状態"],
            ["アラプリマ", "アラプリマ状態"],
            ["回数強化解除無効", "強化解除無効\\\\d+回"],
            ["回数覚醒増加無効", "覚醒ゲージの増加を無効化"],
            ["クロノ", "クロノ状態"],
            ["従属チェイン", "従属チェイン\\\\d+回"],
            ["幻影", "幻影状態"],
            ["消耗", "消耗状態"],
            ["熱唱", "熱唱状態"],
            ["蓄音", "蓄音を\\\\d+回"],
            ["解放", "解放状態"],
            ["捕縛", "捕縛状態"],
            ["ハイドロアンカー", "ハイドロアンカー状態"],
            ["回数SLvリセット無効", "スキルLvリセットを\\\\d+回無効化"],
            ["舞闘", "舞闘状態"],
            ["魂衣", "魂衣状態"],
            ["順応", "順応状態"],
            ["誘雷", "誘雷状態"],
            ["回数B待機解除無効", "ブレイク待機解除を\\\\d+回無効化"],
            ["点穴還元", "点穴を\\\\d+回還元"],
            ["アーマー増強", "アーマー増強状態"],
            ["集疫", "集疫状態"],
            ["オーバーチャージ", "オーバーチャージ状態（\\\\d+回）"],
        ];
        var aura = [
            "勇猛のオーラ",
            "彩色のオーラ",
            "練達のオーラ",
            "伝説のオーラ",
            "奮闘のオーラ",
            "堅忍不抜のオーラ",
            "気炎のオーラ",
            "友愛のオーラ",
            "連撃のオーラ",
        ];
        var trans = [
            ["協奏", "味方編成を協奏状態"],
            ["怒闘", "味方編成を怒闘状態"],
            ["バレットアーツ", "味方編成をBアーツ状態"],
            ["ネクロ", "味方編成をネクロ状態"],
            ["Fインパルス", "味方編成をFインパルス状態"],
            ["重奏", "味方編成を重奏状態"],
            ["コロッセオ", "敵と味方の編成をコロッセオ状態"],
        ];

        var placeholder = document.getElementById("placeholder_shortcut");

        var details = document.createElement("details");
        details.innerHTML += "<summary>強化</summary>";
        for (var i in param) {
            details.appendChild(create_shortcut(param[i], param[i] + "を\\\\d+%上昇"));
        }
        for (var i in buffer) {
            details.appendChild(create_shortcut(buffer[i][0], buffer[i][1]));
        }
        placeholder.appendChild(details);

        var target = "(?:単体|横一列|全体)に";
        var penet = "(?:防御力を無視した)?"
        var source = "(?:攻撃力|防御力|素早さ)[0-9\\\\.]+倍の";
        var multihit = "(?:\\\\d+連続)?";
        var elemental = "(?:火|雷|破断|響撃|光子)?";
        var details = document.createElement("details");
        var damage1 = "(?:[0-9\\\\.]+倍のダメージ|ダメージが[0-9\\\\.]+(?:倍|%上昇))";
        var enemy1 = "(?:系の?(?:モンスター|対象)(?:に|への)|敵が[^状態]{1,3}のとき、?)";
        var enemy2 = "(?:(?<!系の?)(?:モンスター|対象)(?:に|への)|敵が.{1,3}状態のとき、?)";
        details.innerHTML += "<summary>攻撃手段</summary>";
        details.appendChild(create_shortcut("防御無視", "(?:防御無視" + multihit + "ダメージ)|" +
            "(?:防御力を無視した" + source + multihit + elemental + "ダメージ)|(?:防御力を(?:\\\\d+%)?無視する)"));
        details.appendChild(create_shortcut("種族特効", enemy1 + damage1));
        details.appendChild(create_shortcut("状態異常特効", enemy2 + damage1));
        details.appendChild(create_shortcut("火ダメージ", target + penet + source + multihit + "火ダメージ"));
        details.appendChild(create_shortcut("雷ダメージ", target + penet + source + multihit + "雷ダメージ"));
        details.appendChild(create_shortcut("破断ダメージ", target + penet + source + multihit + "破断ダメージ"));
        details.appendChild(create_shortcut("響撃ダメージ", target + penet + source + multihit + "響撃ダメージ"));
        details.appendChild(create_shortcut("光子ダメージ", target + penet + source + multihit + "光子ダメージ"));
        details.appendChild(create_shortcut("固定ダメージ", "の固定ダメージ"));
        details.appendChild(create_shortcut("防御力依存ダメージ", "防御力[0-9\\\\.]+倍の" + multihit + elemental + "ダメージ"));
        details.appendChild(create_shortcut("素早さ依存ダメージ", "素早さ[0-9\\\\.]+倍の" + multihit + elemental + "ダメージ"));
        details.appendChild(create_shortcut("連続ダメージ", target + penet + source + "\\\\d+連続" + elemental + "ダメージ"));
        details.appendChild(create_shortcut("列ダメージ", "横一列に" + penet + source + multihit + elemental + "ダメージ"));
        details.appendChild(create_shortcut("全体ダメージ", "全体に" + penet + source + multihit + elemental + "ダメージ"));
        placeholder.appendChild(details);

        var heal1 = "(?:(?<!ターン終了時に|毎ターン終了時、)(?:自身|味方(?:単体|横一列|全体))のHPを\\\\d+%回復)";
        var heal2 = "(?:(?<!ターン終了)時に?、?HPが\\\\d+%回復)";
        var details = document.createElement("details");
        details.innerHTML += "<summary>その他支援</summary>";
        details.appendChild(create_shortcut("回復", heal1 + "|" + heal2));
        details.appendChild(create_shortcut("フォトン追加", "(?:アタック|スキル|チャージ)フォトンを\\\\d+つ追加"));
        details.appendChild(create_shortcut("フォトン変化", "(?:アタック|スキル|チャージ)に変化"));
        details.appendChild(create_shortcut("通常チェイン", "味方単体にチェイン"));
        details.appendChild(create_shortcut("自己チェイン", "自身にチェイン"));
        details.appendChild(create_shortcut("その他チェイン", "最も(?:攻撃力の高い|素早さの低い)味方に[^、]*チェイン"));
        details.appendChild(create_shortcut("戦旗", "戦旗を付与"));
        placeholder.appendChild(details);

        var details = document.createElement("details");
        details.innerHTML += "<summary>状態異常</summary>";
        for (var i in bad_status) {
            details.appendChild(create_shortcut(bad_status[i], "(?<!(?:自身|対象|敵)が)" + bad_status[i] + "(?!耐性)"));
        }
        placeholder.appendChild(details);

        var details = document.createElement("details");
        details.innerHTML += "<summary>弱体</summary>";
        for (var i in param) {
            details.appendChild(create_shortcut(param[i], param[i] + "を\\\\d+%低下"));
        }
        for (var i in debuffer) {
            details.appendChild(create_shortcut(debuffer[i][0], debuffer[i][1]));
        }
        placeholder.appendChild(details);

        var details = document.createElement("details");
        details.innerHTML += "<summary>その他妨害</summary>";
        details.appendChild(create_shortcut("フォトン破壊", "フォトンを\\\\d+つ破壊"));
        details.appendChild(create_shortcut("フォトン奪取", "フォトンを\\\\d+つ(?:奪う|奪取)"));
        details.appendChild(create_shortcut("ペインフォトン追加", "ペインフォトンを\\\\d+つ追加"));
        details.appendChild(create_shortcut("フォトン転換", "(?:アタック|スキル|チャージ|ペイン)フォトンに転換"));
        placeholder.appendChild(details);

        var details = document.createElement("details");
        details.innerHTML += "<summary>地形</summary>";
        for (var i in field) {
            details.appendChild(create_shortcut(field[i], field[i] + "の(?:地形効果|地形にし)"));
        }
        for (var i in protection) {
            details.appendChild(create_shortcut(protection[i], protection[i] + "の地形にする"));
        }
        for (var i in exfield) {
            details.appendChild(create_shortcut(exfield[i], exfield[i]));
        }
        details.appendChild(create_shortcut("地形延長", "地形を\\\\d+ターン延長"));
        placeholder.appendChild(details);
        var details = document.createElement("details");

        details.innerHTML += "<summary>状態異常耐性</summary>";
        for (var i in bad_status) {
            if (bad_status[i] == "ノックバック" || bad_status[i] == "引き寄せ") {
                details.appendChild(create_shortcut(bad_status[i] + "耐性", "ノックバック、引き寄せ耐性"));
            } else {
                details.appendChild(create_shortcut(bad_status[i] + "耐性", bad_status[i] + "耐性"));
            }
        }
        details.appendChild(create_shortcut("全状態異常耐性", "全ての状態異常への耐性"));
        placeholder.appendChild(details);

        var details = document.createElement("details");
        details.innerHTML += "<summary>特殊状態</summary>";
        for (var i in extra) {
            details.appendChild(create_shortcut(extra[i][0], extra[i][1]));
        }
        for (var i in aura) {
            details.appendChild(create_shortcut(aura[i], aura[i] + "を\\\\d+個付与"));
        }
        placeholder.appendChild(details);

        var details = document.createElement("details");
        details.innerHTML += "<summary>トランス／ハイトランス</summary>";
        for (var i in trans) {
            details.appendChild(create_shortcut(trans[i][0], trans[i][1]));
        }
        details.appendChild(create_shortcut("音符発生", "【大協奏状態の場合】|"
            +"【\\\\d+ターン音符が\\\\d+個以上で効果が変化】|音符を\\\\d+つ蓄積)"));
        details.appendChild(create_shortcut("バレット作成", "バレットを\\\\d+個作成"));
        details.appendChild(create_shortcut("バレット消費", "バレットを\\\\d+個消費"));
        details.appendChild(create_shortcut("ソウル消費", "ソウルを\\\\d+つ消費"));
        details.appendChild(create_shortcut("跳弾", "さらに\\\\d+回跳弾"));
        details.appendChild(create_shortcut("リリース効果付与", "リリース効果を付与"));
        placeholder.appendChild(details);
    }
    function create_shortcut(text, regex) {
        var template = document.getElementById("template_shortcut");
        var clone = template.cloneNode(true);
        clone.innerHTML = clone.innerHTML.replace(/{\$1}/g, text);
        clone.innerHTML = clone.innerHTML.replace(/{\$2}/g, regex);

        return clone.content;
    }
    function call_shortcut(text) {
        var query = document.getElementById("query");
        query.value = text;
        search();
    }
    function load_status(megido_name) {
        var query = ("SELECT style FROM megido_basic WHERE megido_name == ?");
        var style = alasql(query, [megido_name])[0].style;
        var elems = document.getElementsByName("style");
        for (var i = 0; i < elems.length; i++) {
            if (elems[i].value == style) {
                elems[i].checked = true;
            } else {
                elems[i].checked = false;
            }
        }

        var query = ("SELECT data FROM megido_status "+
            "WHERE megido_name == ? AND category == ? AND evolution == '6'");
        document.getElementById("health1").value = alasql(query, [megido_name, "HP"])[0].data;
        document.getElementById("attack1").value = alasql(query, [megido_name, "攻撃力"])[0].data;
        document.getElementById("defence1").value = alasql(query, [megido_name, "防御力"])[0].data;
        document.getElementById("dexterity1").value = alasql(query, [megido_name, "素早さ"])[0].data;
        update1();
        optimize();
    }
    function initialize_status() {
        var template = document.getElementById("template_load_status");
        var placeholder = document.getElementById("placeholder_load_status");
        var query = ("SELECT megido_name FROM megido_basic WHERE style == ? AND klass == ?");

        var styles = ["ラッシュ", "カウンター", "バースト"];
        var klasses = ["ファイター", "トルーパー", "スナイパー"];

        for (var i = 0; i < styles.length; i++) {
            for (var j = 0; j < klasses.length; j++) {
                var details = document.createElement("details");
                details.innerHTML += "<summary>" + styles[i] + "・" + klasses[j] + "</summary>";

                var res = alasql(query, [styles[i], klasses[j]]);
                for (var k = 0; k < res.length; k++) {
                    var clone = template.cloneNode(true);
                    clone.innerHTML = clone.innerHTML.replace(/{\$1}/g, res[k].megido_name);
                    details.appendChild(clone.content);
                }
                placeholder.appendChild(details);
            }
        }
    }
    function find_pareto_front(rush, counter, burst, size) {
        var query = ("SELECT t1.treasure_name, t1.health, t1.attack, t1.defence, t1.dexterity "+
            "FROM treasure AS t1 "+
            "WHERE t1.rush >= ? AND t1.counter >= ? AND t1.burst >= ? AND t1.size <= ? "+
            "AND NOT EXISTS (SELECT * FROM treasure AS t2 "+
            "    WHERE t2.rush >= ? AND t2.counter >= ? AND t2.burst >= ? AND t2.size <= ? "+
            "    AND t1.health <= t2.health AND t1.attack<= t2.attack "+
            "    AND t1.defence <= t2.defence AND t1.dexterity <= t2.dexterity "+
            "    AND NOT (t1.treasure_name <= t2.treasure_name "+
            "        AND t1.health == t2.health AND t1.attack == t2.attack "+
            "        AND t1.defence == t2.defence AND t1.dexterity == t2.dexterity))");
        var res = alasql(query, [rush, counter, burst, size, rush, counter, burst, size]);
        return res;
    }
    function update1() {
        var health = parseInt(document.getElementById("health1").value);
        var attack = parseInt(document.getElementById("attack1").value);
        var defence = parseInt(document.getElementById("defence1").value);
        var dexterity = parseInt(document.getElementById("dexterity1").value);
        var total = Math.trunc(attack * dexterity / 1000 + health * defence / 10000);
        
        var ougi = parseInt(document.getElementById("ougi").value);
        document.getElementById("total1").value = Math.trunc(total * (1 + 0.05 * ougi) * 1.8 * 1.3);
    }
    function update2() {
        var health = parseInt(document.getElementById("health2").value);
        var attack = parseInt(document.getElementById("attack2").value);
        var defence = parseInt(document.getElementById("defence2").value);
        var dexterity = parseInt(document.getElementById("dexterity2").value);
        var total = Math.trunc(attack * dexterity / 1000 + health * defence / 10000);
        
        var ougi = parseInt(document.getElementById("ougi").value);
        document.getElementById("total2").value = Math.trunc(total * (1 + 0.05 * ougi) * 1.8 * 1.3);
    }
    function optimize() {
        var rush = 0;
        var counter = 0;
        var burst = 0;
        var elems = document.getElementsByName("style");
        for (var i = 0; i < elems.length; i++) {
            if (elems[i].checked) {
                if (elems[i].value == "ラッシュ") {
                    rush = 1;
                } else if (elems[i].value == "カウンター") {
                    counter = 1;
                }  else if (elems[i].value == "バースト") {
                    burst = 1;
                }
            }
        }

        var data_basic = {
            total:0,
            health:parseInt(document.getElementById("health1").value),
            attack:parseInt(document.getElementById("attack1").value),
            defence:parseInt(document.getElementById("defence1").value),
            dexterity:parseInt(document.getElementById("dexterity1").value),
        };

        var ougi = parseInt(document.getElementById("ougi").value);
        if (ougi <= 3) {
            var size_list = [3,2,1,1];
        } else if (ougi <= 4) {
            var size_list = [3,2,2,1];
        } else if (ougi <= 5) {
            var size_list = [3,3,2,1];
        } else if (ougi <= 6) {
            var size_list = [3,3,2,2];
        } else if (ougi <= 7) {
            var size_list = [3,3,3,2];
        } else {
            var size_list = [3,3,3,3];
        }

        var candidate_list = [];
        for (var i = 0; i < size_list.length; i++) {
            candidate_list.push(find_pareto_front(rush, counter, burst, size_list[i]));
        }

        function get_treasures(index) {
            var treasures = [];
            for (var j = 0; j < candidate_list.length; j++) {
                treasures.push(candidate_list[j][index % candidate_list[j].length]);
                index = Math.trunc(index / candidate_list[j].length);
            }
            return treasures;
        }
        function evaluate_index(index) {
            var health = data_basic.health;
            var attack = data_basic.attack;
            var defence = data_basic.defence;
            var dexterity = data_basic.dexterity;
            var treasures = get_treasures(index);
            for (var j = 0; j < treasures.length; j++) {
                var entry = treasures[j];
                if (entry) {
                    health += entry.health;
                    attack += entry.attack;
                    defence += entry.defence;
                    dexterity += entry.dexterity;
                }
            }
            total = attack * dexterity / 1000 + health * defence / 10000;
            return {
                total, health, attack, defence, dexterity
            }
        }

        var index_max = 0;
        var data_max = data_basic;
        var index_end = candidate_list.reduce(
            function (accum, curr) {return accum * curr.length},
            1
        );
        for (var i = 0; i < index_end; i++) {
            var data_temp = evaluate_index(i);
            if (data_temp.total > data_max.total) {
                data_max = data_temp;
                index_max = i;
            }
        }
        
        document.getElementById("health2").value = data_max.health;
        document.getElementById("attack2").value = data_max.attack;
        document.getElementById("defence2").value = data_max.defence;
        document.getElementById("dexterity2").value = data_max.dexterity;
        update2();

        var treasure_list = get_treasures(index_max);

        for (var i = 0; i < treasure_list.length; i++) {
            if (i == 0) {
                var thead = document.getElementById("thead");
                thead.innerHTML = "";
                var tr = document.createElement("tr");
                for (var key in treasure_list[i]) {
                    if (key in database.header) {
                        key = database.header[key];
                    }
                    tr.innerHTML += "<th>" + key + "</th>";
                }
                thead.appendChild(tr);
            }
            var tbody = document.getElementById("tbody");
            if (i == 0) {
                tbody.innerHTML = "";
            }
            var tr = document.createElement("tr");
            for (var j in treasure_list[i]) {
                tr.innerHTML += "<td>" + treasure_list[i][j] + "</td>";
            }
            tbody.appendChild(tr);
        }
        
        return treasure_list;
    }

    return {
        initialize: initialize,
        search: search,
        initialize_shortcut: initialize_shortcut,
        clear_table: clear_table,
        call_shortcut: call_shortcut,
        initialize_status:initialize_status,
        load_status:load_status,
        optimize:optimize,
        update1:update1,
        update2:update2,
    }
}));