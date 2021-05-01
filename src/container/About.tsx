import React from 'react';
import styled from 'styled-components';
import { borderColor, GlobalStyle, titleSize, PageInner, primaryColor, secondaryColor, titleBorderColor, section1Color, section2Color, textColor, titleMarkerColor } from '../style';
import TopImgPc from '../assets/top_img_pc.png'
import TopImgSp from '../assets/top_img_sp.png'
import HowTo1 from '../assets/how_to_1.png'
import HowTo2 from '../assets/how_to_2.png'
import HowTo3 from '../assets/how_to_3.png'
import HowTo4 from '../assets/how_to_4.png'
import Button from '../component/Button';
import { lock } from '../lock';
import { Dispatch } from 'react';

interface Props { }

const About: React.FC<Props> = (props) => {
    return (
        <>
            <Section1>
                <MessageContainer>
                    <PageInner>
                        <Title>Thanks Postとは</Title>
                        <Desc>ファンから貰ったプレゼントの感謝の投稿と、こそっとおねだりもできちゃうサービスです。</Desc>
                        <ImgWrapper></ImgWrapper>
                    </PageInner>
                </MessageContainer>
                <ButtonContainer>
                    <Button text="ログイン"
                        onClick={() => lock.show()}
                        theme={{
                            bgColor: secondaryColor,
                            textColor: "#fff",
                            width: "350px",
                            padding: "12px 16px",
                            weight: "bold"
                        }}
                    />
                </ButtonContainer>
                <ButtonContainer>
                    <Button text="アカウント作成"
                        onClick={() => lock.show()}
                        theme={{
                            bgColor: primaryColor,
                            textColor: "#fff",
                            width: "350px",
                            padding: "12px 16px",
                            weight: "bold"
                        }}
                    />
                </ButtonContainer>
            </Section1>
            <Section2>
                <AboutInnter>
                    <TitleWrap>
                        <HowTo>使い方</HowTo>
                    </TitleWrap>
                    <HowToListWrap>
                        <HowToList>
                            <img src={HowTo1} />
                            <ListTextWrap>
                                <ListTitle>1.プレゼントが貰えた喜びを投稿する</ListTitle>
                                <p>誰かからプレゼントをもらえたらその喜びを投稿して、プレゼントを送ってくれた人やみんなに伝えましょう。</p>
                            </ListTextWrap>
                        </HowToList>
                        <HowToList>
                            <img src={HowTo2} />
                            <ListTextWrap>
                                <ListTitle>2.Amazonの欲しい物リストを登録</ListTitle>
                                <p>AmazonのWEBサイトで欲しいものリストを登録しましょう</p>
                            </ListTextWrap>
                        </HowToList>
                        <HowToList>
                            <img src={HowTo3} />
                            <ListTextWrap>
                                <ListTitle>3.Thanks Post内で欲しい物リストのURLを設定</ListTitle>
                                <p>Thanks Post内のプロフィール編集画面で欲しい物リストのURLを記載して、プロフィールを更新しましょう</p>
                            </ListTextWrap>
                        </HowToList>
                        <HowToList>
                            <img src={HowTo4} />
                            <ListTextWrap>
                                <ListTitle>4.SNSで欲しいものをこそっとおねだりする</ListTitle>
                                <p>欲しい物リストの設定が完了したら欲しいものがあることをTwitterなどのSNSでおねだりしましょう</p>
                            </ListTextWrap>
                        </HowToList>
                    </HowToListWrap>
                </AboutInnter>
            </Section2>
        </>
    );
}

const AboutInnter = styled.div`
    width: 100%;
  @media (min-width: 960px) {
    width: 900px;
    margin: 0 auto;
  }
`

const Title = styled.h2`
    font-size: ${titleSize + "px"};
`

const Desc = styled.p`
    padding: 26px 0 20px 0;
`
const MessageContainer = styled.div`
    text-align: center;
`

const Section1 = styled.section`
    width:100%;
    border-bottom: 1px solid ${borderColor};
    background: ${section1Color};
    padding: 30px;
`

const ImgWrapper = styled.div`
        width: 100%;
        margin: 16px 0;
        padding-top: calc(618/441 * 100%);
        background-image: url(${TopImgSp});
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100%;
        @media (min-width: 480px) {
            padding-top: calc(440/1251 * 100%);
            background-image: url(${TopImgPc});
            background-position: center center;
            background-repeat: no-repeat;
        }
        @media (min-width: 780px) {
            margin: 0;
            background-size: 600px auto;
        }
`

const ButtonContainer = styled.div`
    text-align: center;
    padding: 8px;
    @media (max-width: 520px) {
        button {
            width: 240px;
        }
    }
`

const Section2 = styled.section`
    width:100%;
    padding: 30px;
    background: ${section2Color};
`

const TitleWrap = styled.div`
    padding: 16px 0;
    text-align:center;
`

const HowTo = styled.h2`
    font-size: ${titleSize + "px"};
    background: linear-gradient(transparent 70%, ${titleMarkerColor} 70%);
    display: inline-block;
`
const HowToListWrap = styled.div`
    padding: 30px 0;
`

const HowToList = styled.div`
    display:block;
    background: #fff;
    text-align: left;
    border: 1px solid ${borderColor};
    border-radius: 10px;
    padding: 16px;
    margin: 0 0 16px 0;
    img {   display: block;
            width: 130px;
            margin: 0 auto 16px auto;
        }
    @media (min-width: 520px) {
        padding: 30px;
        display:flex;
    }
`
const ListTextWrap = styled.div`
    padding: 0 0 0 16px;
    @media (min-width: 520px) {
        display: block;
        width: 85%;
    }
`

const ListTitle = styled.p`
    font-size: 18px;
    @media (min-width: 520px) {
        font-size: 22px;
    }
    font-weight: bold;
    padding: 0 0 8px 0;
`

export default About;