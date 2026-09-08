
好的，我们将神经网络与马尔可夫链结合起来，使用神经网络来学习和动态调整马尔可夫链的转移概率。以下是一个完整的示例，包括数据预处理、特征构建、标签生成、构建神经网络模型、训练模型以及预测和可视化结果。

### 1. 数据预处理

```python


import pandas as pd
from sklearn.preprocessing import MinMaxScaler

def preprocess_data(file_path):
    # 读取CSV文件
    try:
        df = pd.read_csv(file_path)
    except FileNotFoundError:
        print(f"文件未找到: {file_path}")
        return None
    
    # 按 match_id、set_no、game_no 和 point_no 对数据进行排序
    df = df.sort_values(by=['match_id', 'set_no', 'game_no', 'point_no'])
    
    # 删除缺失值
    df = df.dropna()
    
    # 归一化数值型特征
    scaler = MinMaxScaler()
    numeric_features = ['p1_distance_run', 'p2_distance_run', 'rally_count', 'speed_mph', 'serve_width', 'serve_depth']
    df[numeric_features] = scaler.fit_transform(df[numeric_features])
    
    return df

# 文件路径
file_path = r"D:\what_i_am_doing\Competition\Math modeling\2025美赛训练\第一次训练\2024C\Wimbledon_featured_matches.csv"
# 调用函数进行数据预处理
df = preprocess_data(file_path)
```

### 2. 特征构建

```python


import pandas as pd

def construct_features(df, window_size=5):
    # 静态特征
    static_features = ['server', 'p1_score', 'p2_score', 'p1_games', 'p2_games', 'p1_ace', 'p2_ace', 'p1_unf_err', 'p2_unf_err']
    
    # 动态特征
    dynamic_features = []
    for feature in ['p1_distance_run', 'p2_distance_run', 'rally_count', 'p1_unf_err', 'p2_unf_err']:
        df[f'{feature}_rolling_mean'] = df[feature].rolling(window=window_size).mean()
        dynamic_features.append(f'{feature}_rolling_mean')
    
    # 最近 window_size 球的胜率
    df['recent_win_rate'] = df['p1_points_won'].rolling(window=window_size).mean()
    dynamic_features.append('recent_win_rate')
    
    return df, static_features, dynamic_features

# 调用函数进行特征构建
df, static_features, dynamic_features = construct_features(df)
```

### 3. 标签生成

```python


import pandas as pd

def generate_labels(df, future_steps=5):
    df['p1_win'] = (df['point_victor'] == 1).astype(int)
    df['p2_win'] = (df['point_victor'] == 2).astype(int)
    
    labels = []
    for i in range(len(df) - future_steps):
        future_points = df['point_victor'].iloc[i:i+future_steps].values
        p1_wins = (future_points == 1).sum()
        p2_wins = (future_points == 2).sum()
        labels.append([p1_wins, p2_wins])
    
    labels_df = pd.DataFrame(labels, columns=['future_p1_wins', 'future_p2_wins'])
    df = df.iloc[:-future_steps].reset_index(drop=True)
    df = pd.concat([df, labels_df], axis=1)
    
    return df

# 调用函数生成标签
df = generate_labels(df)
```

### 4. 构建神经网络模型

```python


import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense

def build_rnn_model(input_shape, output_size):
    model = Sequential()
    model.add(LSTM(64, input_shape=input_shape, return_sequences=True))
    model.add(LSTM(64))
    model.add(Dense(output_size, activation='softmax'))
    
    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
    return model

# 假设输入特征维度为 len(static_features) + len(dynamic_features)
input_shape = (None, len(static_features) + len(dynamic_features))
output_size = 2  # 预测选手1和选手2的胜负概率

# 构建模型
model = build_rnn_model(input_shape, output_size)
model.summary()
```

### 5. 模型训练

```python


from sklearn.model_selection import train_test_split

def prepare_data(df, static_features, dynamic_features, history_length=10):
    X = []
    y = []
    
    for i in range(history_length, len(df)):
        X.append(df[static_features + dynamic_features].iloc[i-history_length:i].values)
        y.append(df[['future_p1_wins', 'future_p2_wins']].iloc[i].values)
    
    X = np.array(X)
    y = np.array(y)
    
    return train_test_split(X, y, test_size=0.2, random_state=42)

# 准备数据
X_train, X_test, y_train, y_test = prepare_data(df, static_features, dynamic_features)

# 训练模型
model.fit(X_train, y_train, epochs=10, batch_size=32, validation_data=(X_test, y_test))
```

### 6. 融合马尔可夫链

我们将使用神经网络的输出作为马尔可夫链的转移概率。

```python


import numpy as np

def markov_chain_prediction(model, X_test, steps=5):
    state_probabilities = model.predict(X_test)
    predictions = []

    for i in range(len(state_probabilities) - steps):
        current_state = state_probabilities[i]
        for _ in range(steps):
            next_state = np.dot(current_state, state_probabilities[i + 1])
            current_state = next_state
        predictions.append(current_state)

    return np.array(predictions)

# 使用马尔可夫链进行预测
predictions = markov_chain_prediction(model, X_test)
```

### 7. 结果可视化

```python


import matplotlib.pyplot as plt

# 可视化结果
plt.figure(figsize=(10, 6))
plt.plot(y_test[:, 0], label='Actual Player 1 Win')
plt.plot(predictions[:, 0], label='Predicted Player 1 Win')
plt.xlabel('Sample')
plt.ylabel('Win Probability')
plt.title('Player 1 Win Probability Prediction with Markov Chain')
plt.legend()
plt.show()
```

以上代码示例展示了如何进行数据预处理、特征构建、标签生成、构建神经网络模型、训练模型、融合马尔可夫链以及预测和可视化结果。你可以根据具体需求进一步调整和扩展这些代码。如果有任何具体问题或需要进一步的帮助，请随时告诉我。

$$
	\left\{
	\begin{aligned}
	&\\
	&\phi_{u} = \phi_{i}+\frac{\pi}{2}
	\end{aligned}
	\right.
	$$

**公式**：$[\hat{y} - z \cdot \sigma, \hat{y} + z \cdot \sigma]$  
其中，$\sigma$ 是标准差，$z$ 是 z-score（例如 95% 置信区间，$z \approx 1.96$）。

# 用SHAP分析运动项目对国家奖牌数的影响
## 用SHAP分析运动项目对传统强国奖牌总数的影响
图
1. usa：
	1. 从上到下，项目特征向量对总奖牌数的贡献大小
	2. 特征值点的颜色：
	3. 特征值的分布
2. china
	1. 从上到下，项目特征向量对总奖牌数的贡献大小
	2. 特征值点的颜色：
	3. 特征值的分布
## 用SHAP分析运动项目对有突出特长的国奖牌总数的影想
1. kenya：
	1. 从上到下，项目特征向量对总奖牌数的贡献大小
	2. 特征值点的颜色：
	3. 特征值的分布
2. YAM
	1. 从上到下，项目特征向量对总奖牌数的贡献大小
	2. 特征值点的颜色：
	3. 特征值的分布

```c
HAL_TIM_Base_Start(&htim3);                           //开启定时器3
HAL_ADCEx_Calibration_Start(&hadc1);                  //AD校准，F4不用校准没用这行函数。
HAL_ADC_Start_DMA(&hadc1, (uint32_t *)adc_buff, 200); //让ADC1去采集200个数，存放到adc_buff数组里
while (!AdcConvEnd)                                   //等待转换完毕
    ;
for (uint16_t i = 0; i < 200; i++)
{
    printf("%.3f\n", adc_buff[i] * 3.3 / 4095); //数据打印，查看结果
}

```

```c
#include <stdio.h>
#include <math.h>

#define PI 3.14159265358979323846
#define NUM_POINTS 256

int main() {
    double a[NUM_POINTS];
    double amplitude = 1.0;
    double dc_bias = 1.1;

    for (int i = 0; i < NUM_POINTS; i++) {
        double t = 2 * PI * i / NUM_POINTS;
        a[i] = amplitude * sin(t) + dc_bias;
    }

    printf("double a[256] = {");
    for (int i = 0; i < NUM_POINTS; i++) {
        if (i > 0) {
            printf(", ");
        }
        printf("%.10f", a[i]);
    }
    printf("};\n");

    return 0;
}
    
```

```c
#include <stdio.h>
#include <math.h>

#define PI 3.14159265358979323846
#define NUM_POINTS 256
#define MIN_VALUE 0
#define MAX_VALUE 4096

int main() {
    int a[NUM_POINTS];
    double amplitude = 1.0;
    double dc_bias = 1.1;

    for (int i = 0; i < NUM_POINTS; i++) {
        double t = 2 * PI * i / NUM_POINTS;
        double sine_value = amplitude * sin(t) + dc_bias;

        // 计算正弦波的最小和最大值
        double min_sine = -amplitude + dc_bias;
        double max_sine = amplitude + dc_bias;

        // 线性映射到 0 - 4096 范围
        a[i] = (int)((sine_value - min_sine) / (max_sine - min_sine) * (MAX_VALUE - MIN_VALUE) + MIN_VALUE);
    }

    printf("int a[256] = {");
    for (int i = 0; i < NUM_POINTS; i++) {
        if (i > 0) {
            printf(", ");
        }
        printf("%d", a[i]);
    }
    printf("};\n");

    return 0;
}
    
```

